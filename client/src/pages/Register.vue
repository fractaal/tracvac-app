<template>
  <q-page class="mx-12">
    <div class="pt-8">
      <div class="flex flex-row justify-between align-baseline">
        <h4 class="m-0 logo-text">{{$props.mode === 'register' ? 'SIGN UP' : 'YOUR INFO'}}</h4>
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
              <div v-for="(data) in template[activeSection].formItems" :key="data.name" class="mb-2">
                <div v-if="(data.conditionalFunction && data.conditionalFunction(formData)) || !data.conditionalFunction">
                  <q-select outlined dense
                    :label="data.displayName || data.name"
                    v-if="data.format == 'Dropdown' && data.type == 'string'"
                    :name="data.name"
                    :id="data.name"
                    v-model="formData[data.name]"
                    :options="data.options"
                    />
                  <q-select outlined dense
                    v-else-if="data.format == 'Dropdown' && data.type == 'boolean'"
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
                  <q-input dense
                    :label="data.displayName || data.name"
                    v-else-if="data.format == 'Text'"
                    type="text"
                    v-model="formData[data.name]"
                    :maxlength="data.limit || 999"
                    :rules="[
                      val => !!val || data.displayName + ' can\'t be empty.',
                      ...data.rules || []
                    ]"
                    />
                  <q-input dense v-else-if="data.format == 'Password'" v-model="formData[data.name]" :type="isPassword? 'password' : 'text'" label="Password" :rules="[
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
                    <q-input dense :label="data.displayName" v-model="formData[data.name]" mask="date" :rules="['date']" class="w-full">
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
import { format } from 'date-fns'
import transition from '../transitions'
import { store } from 'src/api/store'
import registrationFormTemplate, { FormData } from '../templates/registrationFormTemplate'
import Vue from 'vue'
import { register } from '../api/auth'
import { setUserInfo } from 'src/api/user'
import { Dialog } from 'quasar'

export default Vue.extend({
  name: 'Register',
  props: {
    mode: {
      type: String as () => 'register' | 'edit',
      required: true
    }
  },
  data () {
    return {
      transition,
      template: [...registrationFormTemplate],
      activeSection: 0,
      isPassword: false,
      formData: {} as FormData
    }
  },
  activated () {
    this.template = [...registrationFormTemplate]
    console.log(`Register component activated with mode ${this.$props.mode}`)
    if (this.$props.mode === 'register') {
      for (const section of registrationFormTemplate) {
        for (const formItem of section.formItems) {
          this.$set(this.formData, formItem.name, null)
        }
      }
    } else if (this.$props.mode === 'edit') {
      this.template.splice(4) // Don't show the username/email/password bit
      console.log('template: ', this.template)
      for (const section of registrationFormTemplate) {
        for (const formItem of section.formItems) {
          console.log(store.userInfo)
          if (formItem.name === 'password' || formItem.name === 'username' || formItem.name === 'email') continue
          if (formItem.type === 'boolean') this.$set(this.formData, formItem.name, !!(store.userInfo![formItem.name]))
          else if (formItem.type === 'date') this.$set(this.formData, formItem.name, format(new Date(store.userInfo![formItem.name]), 'yyyy/MM/dd'))
          else this.$set(this.formData, formItem.name, store.userInfo![formItem.name])
        }
      }
      /**
      for (const userInfoKey in store.userInfo) {
        this.$set(this.formData, userInfoKey, store.userInfo[userInfoKey])
      } */
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
        if (this.$props.mode === 'register') {
          Dialog.create({
            title: 'Cancel registration?',
            cancel: true
          }).onOk(() => {
            this.$router.go(-1)
          })
        } else if (this.$props.mode === 'edit') {
          Dialog.create({
            title: 'Go back?',
            message: 'Any changes you made to your personal information on this screen will be discarded.',
            cancel: true
          }).onOk(() => {
            this.$router.go(-1)
          })
        }
      } else {
        this.navigate(-1)
      }
    },
    next () {
      if (this.activeSection === this.template.length - 1) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        if (this.$props.mode === 'register') {
          this.submit()
        } else if (this.$props.mode === 'edit') {
          Dialog.create({
            title: 'Save these changes?',
            cancel: true
          }).onOk(() => {
            this.submit()
          })
        }
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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

                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  if (this.formData[itemName].label) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    dataToSubmit[itemName] = this.formData[itemName].value
                  }
                }
              }
            }
          }
        }
      }
      console.log('data to submit: ', dataToSubmit)
      // If the code reaches here, it is successfully verified that every field is filled properly.
      if (this.$props.mode === 'register') {
        const [result, message] = await register(dataToSubmit)

        if (result) {
          await this.$router.push('/home')
        } else {
          this.$q.notify({
            message,
            type: 'negative'
          })
        }
      } else if (this.$props.mode === 'edit') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (await setUserInfo(dataToSubmit)) { this.$router.back() }
      }
    },
    navigate (n: number) {
      this.activeSection = (this.activeSection + n) === -1 ? (this.template.length - 1) : (this.activeSection + n) % this.template.length
    }
  }
})
</script>
