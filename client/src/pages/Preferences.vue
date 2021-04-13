<template>
  <q-page>
    <custom-header title="Preferences"/>
    <div class="px-8">
      <p class="font-bold m-0 p-0 text-gray-500">YOU'RE CONNECTED TO</p>
      <p class="text-h5 m-0">{{store.serverInfo.location}}</p>
      <p class="m-0">at <b>{{store.serverInfo.address}}</b></p>
      <hr>
      <q-btn outline label="Disconnect" @click="disconnect"/>
      <div
        class="text-subtitle2 mt-4 font-bold m-0 p-0 text-gray-500"
      >
        APP VERSION {{require('../../package.json').version}}
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { store } from 'src/api/store'
import { disconnect } from 'src/api/server'
import CustomHeader from 'components/CustomHeader.vue'

export default Vue.extend({
  name: 'Preferences',
  components: { CustomHeader },
  data () {
    return {
      store
    }
  },
  methods: { disconnect }
})
</script>

<style scoped>

</style>
