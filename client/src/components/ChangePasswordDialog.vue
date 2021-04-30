<template>
  <q-dialog persistent ref="dialog" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin p-4"
      style="background-image: url('/color.png'); background-repeat: no-repeat; background-attachment: fixed; background-position: center;"
    >
      <q-card-section >
        <div class="mt-8 text-h5">CHANGE PASSWORD</div>
        <div class="mt-4 text-subtitle2 content-center">OLD PASSWORD</div>
        <q-input v-model="oldPassword" :type="showOldPassword ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="showOldPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showOldPassword = !showOldPassword "
            />
          </template>
        </q-input>
        <div class="mt-2 text-subtitle2 content-center">NEW PASSWORD</div>
        <q-input v-model="newPassword" :type="showNewPassword ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="showNewPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showNewPassword = !showNewPassword "
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn :disable="!canClickOK" icon="fas fa-check" flat class="p-4" label="Change My Password" @click="onOKClick"/>
        <q-btn icon="fas fa-times" flat class="p-4" label="Cancel" @click="onCancelClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { QDialog } from 'quasar'

export default Vue.extend({
  name: 'ChangePasswordDialog',
  data () {
    return {
      showNewPassword: false,
      newPassword: '',
      showOldPassword: false,
      oldPassword: ''
    }
  },
  computed: {
    canClickOK (): boolean {
      return (this.newPassword !== '' && this.oldPassword !== '')
    }
  },
  methods: {
    show () {
      (this.$refs.dialog as QDialog).show()
    },
    hide () {
      (this.$refs.dialog as QDialog).hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok', { oldPassword: this.oldPassword, newPassword: this.newPassword })
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
})
</script>
