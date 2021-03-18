<template>
  <q-page>
    <h5 class="font-bold m-0 my-8 px-8">Create a Log</h5>
    <div v-for="formItem in logTemplate[0].formItems" :key="formItem.name" class="flex flex-row items-center p-8 m-4 border-2 border-blue-500 border-solid shadow-lg rounded-lg">
      <q-checkbox v-model="logData[formItem.name]"/>
      <div>
        <p class="m-0 p-0 font-bold">{{formItem.displayName}}</p>
        <p class="m-0 p-0">{{formItem.description}}</p>
      </div>
    </div>
    <q-btn label="Submit" @click="submit" color="primary" class="block mx-auto px-8 py-2 rounded-lg"/>
    <br>
  </q-page>
</template>

<script lang="ts">
import logTemplate from '../templates/logTemplate'
import { Log, postLog } from '../api/logs'
import Vue from 'vue'

export default Vue.extend({
  name: 'ViewLog',
  data () {
    return {
      logTemplate,
      logData: {} as Record<string, any>
    }
  },
  created () {
    for (const section of logTemplate) {
      for (const formItem of section.formItems) {
        Vue.set(this.logData, formItem.name, false)
      }
    }
  },
  methods: {
    async submit () {
      const result = await postLog(this.logData as Log)

      for (const key in this.logData) {
        this.logData[key] = false
      }

      if (result) {
        this.$router.back()
      }
    }
  }
})
</script>

<style>

</style>
