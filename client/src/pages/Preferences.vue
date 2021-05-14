<template>
  <q-page>
    <custom-header title="Preferences"/>
    <div class="px-8">
      <p class="font-bold m-0 p-0 text-gray-500">YOU'RE CONNECTED TO</p>
      <p class="text-h5 m-0">{{store.serverInfo.name}}</p>
      <p class="m-0">of <b>{{store.serverInfo.location}}</b></p>
      <p class="m-0">at <b>{{store.serverInfo.address}}</b></p>
      <br>
      <q-list class="space-y-4">
        <q-item v-if="showDisconnectButton" tag="label" class="ring ring-gray-200 rounded-xl" v-ripple @click="disconnect">
          <q-item-section>
            <q-item-label class="mt-2">
              <b> Disconnect </b>
              <p> Disconnect from the current Tracvac server you're connected to. </p>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item tag="label" class="ring ring-gray-200 rounded-xl" v-ripple @click="changePassword">
          <q-item-section>
            <q-item-label class="mt-2">
              <b> Change Password </b>
              <p> Easily change your password here. <br/> You'll need to input your old password to do so first. </p>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item tag="label" class="ring ring-gray-200 rounded-xl" v-ripple>
          <q-item-section>
            <q-item-label class="mt-2">
              <b> Notifications </b>
              <p> Notifications allow us to tell you about vaccine updates or LGU updates without you needing to have Tracvac open. </p>
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="blue" v-model="store.showNotifications"/>
          </q-item-section>
        </q-item>
        <div class="text-subtitle2 mt-4 font-bold m-0 p-0 text-gray-500">
          APP VERSION {{require('../../../package.json').version}}
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { store } from 'src/api/store'
import { disconnect } from 'src/api/server'
import { changePassword } from 'src/api/user'
import { subscribe, unsubscribe } from 'src/api/push'
import CustomHeader from 'components/CustomHeader.vue'

export default Vue.extend({
  name: 'Preferences',
  components: { CustomHeader },
  created () {
    if (process.env.MODE === 'pwa') {
      this.showDisconnectButton = false
    }
  },
  data () {
    return {
      showDisconnectButton: true,
      store
    }
  },
  watch: {
    'store.showNotifications': function (val: boolean) {
      if (val) {
        subscribe()
      } else {
        unsubscribe()
      }
    }
  },
  methods: { disconnect, changePassword }
})
</script>

<style scoped>

</style>
