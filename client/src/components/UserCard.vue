<template>
  <q-dialog persistent ref="dialog" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin p-4"
      style="background-image: url('/color.png'); background-repeat: no-repeat; background-attachment: fixed; background-position: center;"
    >
      <q-card-section >
        <div class="mt-8 text-h5">HEADS UP!</div>
        <div class="mt-4 text-subtitle2 content-center">YOUR USERNAME IS</div>
        <div class="text-h4 font-black">
          <q-icon name="fas fa-user"/>
          {{username}}
        </div>
        <div class="mt-2 text-subtitle2 content-center">YOUR PASSWORD IS</div>
        <div class="text-h4 font-black">
          <q-icon name="fas fa-key"/>
          {{password}}
        </div>
        <hr>
        <div class="text-subtitle2">
          If you might forget your password, take a screenshot of this screen and save it.
          <b>You won't be able to retrieve your password otherwise.</b>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn :disable="!canClickOK" icon="fas fa-check" flat class="p-4" :label="timeRemaining !== 0 ? `Okay (${timeRemaining})` : `Okay`" @click="onOKClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { QDialog } from 'quasar'

export default Vue.extend({
  name: 'UserCard',
  data () {
    return {
      canClickOK: false,
      timeRemaining: 10
    }
  },
  props: {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  async created () {
    for (let i = this.timeRemaining; i >= 0; i--) {
      await new Promise(r => setTimeout(r, 1000))
      this.timeRemaining = i
    }
    this.canClickOK = true
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
