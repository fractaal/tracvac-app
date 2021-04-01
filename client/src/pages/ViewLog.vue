<template>
  <q-page>
    <custom-header title="Create New Log" class="bg-blue-500 text-white"/>
    <div class="bg-blue-100 mx-4 mt-8 p-4 rounded-xl">
      <p class="font-bold">Stop and call 117 if you are experiencing:</p>
      <ul class="px-4">
        <li>Severe, constant chest pain or pressure</li>
        <li>Extreme difficulty breathing</li>
        <li>Severe, constant lightheadedness</li>
        <li>Serious disorientation or unresponsiveness</li>
      </ul>
    </div>
    <div v-for="formItem in logTemplate[0].formItems" :key="formItem.name" class="flex flex-row items-center m-4 border-2 border-blue-500 border-solid shadow-lg rounded-lg">
      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="logData[formItem.name]" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{formItem.displayName}}</q-item-label>
          <q-item-label caption>{{formItem.description}}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="bg-blue-500 py-4 text-white">
      <q-item tag="label" v-ripple class="p-8">
        <q-item-section avatar>
          <q-checkbox v-model="certified" />
        </q-item-section>
        <q-item-section>
          <q-item-label>I certify that the information submitted in this report is true and correct to the best of my knowledge.</q-item-label>
        </q-item-section>
      </q-item>
      <div class="flex flex-row mt-4">
        <q-btn unelevated rounded label="Clear All" @click="clearAll" color="white" text-color="black" class="block ml-auto mr-2 px-8 py-2 rounded-lg"/>
        <q-btn :disable="!certified" rounded unelevated label="Save" @click="submit" color="white" text-color="black" class="block mr-auto ml-2 px-8 py-2 rounded-lg"/>
      </div>
    </div>
    <br>
  </q-page>
</template>

<script lang="ts">
import logTemplate, { LogData } from '../templates/logTemplate'
import { Log, postLog } from '../api/logs'
import Vue from 'vue'
import CustomHeader from 'components/CustomHeader.vue'

export default Vue.extend({
  name: 'ViewLog',
  components: { CustomHeader },
  activated() {
    this.certified = false;
  },
  data () {
    return {
      logTemplate,
      logData: {} as LogData,
      certified: false
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
      await new Promise(resolve => setTimeout(resolve, 300))
      const result = await postLog(this.logData as Log)

      for (const key in this.logData) {
        this.logData[key] = false
      }

      if (result) {
        this.$router.back()
      }
    },
    clearAll () {
      for (const key in this.logData) {
        this.logData[key] = false
      }
    }
  }
})
</script>

<style>

</style>
