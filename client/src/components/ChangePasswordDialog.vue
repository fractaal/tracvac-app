<template>
  <q-dialog persistent ref="dialog" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin p-4"
      style="background-image: url('/color.png'); background-repeat: no-repeat; background-attachment: fixed; background-position: center;"
    >
      <q-card-section >
        <div class="mt-8 text-h5">CHANGE PASSWORD</div>
        <div class="mt-4 text-subtitle2 content-center">OLD PASSWORD</div>
        <q-input type="password"/>
        <div class="mt-2 text-subtitle2 content-center">NEW PASSWORD</div>
        <q-input type="password"/>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn :disable="!canClickOK" icon="fas fa-check" flat class="p-4" label="Change My Password" @click="onOKClick"/>
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
      showOldPassword: false,
      canClickOK: false
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
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      // nothing..
    }
  }
})
</script>
