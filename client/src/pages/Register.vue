<template>
  <q-page class="mx-12">
    <div class="bg-blue-500 text-white p-8 rounded-b-3xl">
      <div class="flex flex-row justify-between align-baseline">
        <h4 class="m-0 logo-text">SIGN UP</h4>
        <p>{{activeSection + 1}} of {{template.length}}</p>
      </div>
    </div>
    <div>
      <transition :enter-active-class="`animated fadeIn`" :leave-active-class="`animated fadeOut`" mode="out-in" :duration="100">
        <div :key="activeSection">
          <div>
            <h6 class="mt-8 mb-0 logo-text">{{template[activeSection].title.toUpperCase()}}</h6>
            <p>{{template[activeSection].description}}</p>
          </div>
          <div>
            <transition-group name="transition" mode="out-in">
              <div v-for="data in template[activeSection].formItems" :key="data.name" class="mb-2">
                <div v-if="(data.conditionalFunction && data.conditionalFunction(formData)) || !data.conditionalFunction">
                  <q-select outlined
                    :label="data.displayName || data.name"
                    v-if="data.format == 'Dropdown' && data.type == 'String'"
                    :name="data.name"
                    :id="data.name"
                    v-model="formData[data.name]"
                    :options="data.options"
                    />
                  <q-select outlined
                    v-else-if="data.format == 'Dropdown' && data.type == 'Boolean'"
                    :label="data.displayName || data.name"
                    :name="data.name"
                    :id="data.name"
                    :options="[
                      {
                        label: 'Yes',
                        value: true
                      },
                      {
                        label: 'No',
                        value: false,
                      }
                    ]"
                    v-model="formData[data.name]"
                    />
                  <q-input
                    :label="data.displayName || data.name"
                    v-else-if="data.format == 'Text'"
                    type="text"
                    v-model="formData[data.name]"
                    :maxlength="data.limit || 999"
                    :rules="[
                      val => !!val || data.displayName + ' can\'t be empty.'
                    ]"
                    />
                  <q-input v-else-if="data.format == 'Password'" v-model="formData[data.name]" :type="isPassword? 'password' : 'text'" label="Password" :rules="[
                    val => !!val || 'Your password can\'t be empty.'
                  ]">
                    <template v-slot:append>
                      <q-icon
                        :name="isPassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPassword= !isPassword"
                      />
                    </template>
                  </q-input>
                  <div v-else-if="data.format == 'DatePicker'" class="column items-center">
                    <q-input :label="data.displayName" v-model="formData[data.name]" mask="date" :rules="['date']" class="w-full">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="formData[data.name]">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div v-if="data.description">
                    <br>
                    <p class="text-xs -mt-3">{{data.description}}</p>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </transition>
    </div>
    <br><br><br>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="back" class="mr-2" fab :icon="backIcon" color="primary" />
      <q-btn @click="next" fab :icon="forwardIcon" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import transition from '../transitions'
import registrationFormTemplate from '../templates/registrationFormTemplate'
import Vue from 'vue'
import { register } from '../api/auth'

export default Vue.extend({
  name: 'Register',
  data () {
    return {
      transition,
      template: registrationFormTemplate,
      activeSection: 0,
      isPassword: false,
      formData: {} as Record<string, any>
    }
  },
  created () {
    for (const section of registrationFormTemplate) {
      for (const formItem of section.formItems) {
        this.$set(this.formData, formItem.name, null)
      }
    }
  },
  computed: {
    backIcon (): string {
      return this.activeSection === 0 ? 'close' : 'keyboard_arrow_left'
    },
    forwardIcon (): string {
      return this.activeSection === this.template.length - 1 ? 'check_circle' : 'keyboard_arrow_right'
    }
  },
  methods: {
    back () {
      if (this.activeSection === 0) {
        this.$router.go(-1)
      } else {
        this.navigate(-1)
      }
    },
    next () {
      if (this.activeSection === this.template.length - 1) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.submit()
      } else {
        this.navigate(1)
      }
    },
    async submit () {
      const dataToSubmit: Record<string, any> = {}
      for (const itemName in this.formData) {
        for (const section of registrationFormTemplate) {
          for (const formItem of section.formItems) {
            if (formItem.name === itemName) {
              const templateItem = formItem

              if ((templateItem.conditionalFunction && templateItem.conditionalFunction(this.formData)) || !templateItem.conditionalFunction) {
                if (this.formData[itemName] === undefined || this.formData[itemName] === null || this.formData[itemName] === '') {
                  this.$q.notify({
                    message: `${templateItem.displayName} in ${section.title} needs to be completed.`,
                    type: 'negative',
                    position: 'center',
                    timeout: 2500
                  })
                  return
                } else {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  dataToSubmit[itemName] = this.formData[itemName]
                }
                if (this.formData[itemName].label) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  dataToSubmit[itemName] = this.formData[itemName].value
                }
              }
            }
          }
        }
      }
      console.log('data to submit: ', dataToSubmit)
      // If the code reaches here, it is successfully verified that every field is filled properly.
      const [result, message] = await register(dataToSubmit)

      if (result) {
        await this.$router.push('/home')
      } else {
        this.$q.notify({
          message,
          type: 'negative'
        })
      }
    },
    navigate (n: number) {
      this.activeSection = (this.activeSection + n) === -1 ? (this.template.length - 1) : (this.activeSection + n) % this.template.length
    }
  }
})
</script>
