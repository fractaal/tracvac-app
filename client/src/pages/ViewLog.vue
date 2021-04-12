<template>
  <q-page>
    <custom-header title="Create New Log" class="bg-blue-500 text-white"/>
    <div class="bg-blue-100 mx-4 mt-8 p-4 rounded-xl">
      <p class="font-bold">Stop and call the emergency hotline if you are experiencing:</p>
      <ul class="px-4">
        <li>Severe, constant chest pain or pressure</li>
        <li>Extreme difficulty breathing</li>
        <li>Severe, constant lightheadedness</li>
        <li>Serious disorientation or unresponsiveness</li>
      </ul>
    </div>
    <div v-for="formItem in logTemplate[0].formItems" :key="formItem.name">
      <div v-if="formItem.name !== 'others'" class="flex flex-row items-center m-4 border-2 border-blue-500 border-solid shadow-lg rounded-lg">
        <q-item tag="label" v-ripple >
          <q-item-section avatar>
            <q-checkbox v-model="logData[formItem.name]" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{formItem.displayName}}</q-item-label>
            <q-item-label caption>{{formItem.description}}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-item tag="label" class="flex flex-row items-center m-4 border-2 border-blue-500 border-solid shadow-lg rounded-lg">
      <q-item-section>
        <q-item-label>Others</q-item-label>
        <q-item-label caption class="mb-2">If you have symptoms not present above, write them here.</q-item-label>
        <q-input outlined dense v-model="logData.others"/>
      </q-item-section>
    </q-item>
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
        <q-btn unelevated rounded label="Clear All" @click="reset" color="white" text-color="black" class="block ml-auto mr-2 px-8 py-2 rounded-lg"/>
        <q-btn :disable="!isLogValid" rounded unelevated label="Save" @click="submit" color="white" text-color="black" class="block mr-auto ml-2 px-8 py-2 rounded-lg"/>
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
  activated () {
    this.certified = false
  },
  data () {
    return {
      logTemplate,
      logData: {} as LogData,
      certified: false
    }
  },
  computed: {
    isLogValid (): boolean {
      return (this.certified && (Object.values(this.logData).reduce((acc, curr) => curr || acc, false)) as boolean)
    }
  },
  created () {
    this.reset()
  },
  methods: {
    async submit () {
      const result = await postLog(this.logData as Log)
      this.reset()
      if (result) {
        this.$router.back()
      }
    },
    reset () {
      for (const section of logTemplate) {
        for (const formItem of section.formItems) {
          if (formItem.name !== 'others') Vue.set(this.logData, formItem.name, false)
          else Vue.set(this.logData, formItem.name, '')
        }
      }
    }
  }
})
</script>

<style>

</style>
