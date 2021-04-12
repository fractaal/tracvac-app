<template>
  <q-page>
    <q-pull-to-refresh @refresh="getUserInfo">
      <custom-header class="bg-blue-500 text-white" title="Vaccine Status"/>
      <div class="m-8 p-8 border-solid border-blue-500 shadow-lg rounded-lg text-center">
        <p class="m-0 font-bold text-h4">Your vaccine is {{store.userInfo.isVaccineReady.toLowerCase()}}.</p>
        <p v-if="store.userInfo.isVaccineReady === 'Ready'">
          Please proceed to your local healthcare center for your vaccination process.
        </p>
        <p v-else>
          Check back soon! We'll notify you once it is.
        </p>
        <img src="~assets/tracvac-logo.png" class="w-80" alt=""/>
        <q-icon :class="color" class="block ml-auto mr-12 -mt-16" :name="icon" size="72px"/>
        <p v-if="store.userInfo.isVaccineReady === 'Ready'" class="text-h6">Manufacturer: {{store.userInfo.vaccineManufacturer}}</p>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import { store } from '../api/store'
import { getUserInfo } from 'src/api/user'
import CustomHeader from 'components/CustomHeader.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'Profile',
  components: { CustomHeader },
  activated () {
    this.setIcon()
    store.changeInVaccineStatus = false
  },
  updated () {
    this.setIcon()
  },
  data () {
    return {
      icon: 'fas fa-times-circle',
      color: 'text-red-500',
      store
    }
  },
  methods: {
    async getUserInfo (done: Function) {
      await getUserInfo()
      done()
    },
    setIcon () {
      switch (store.userInfo?.isVaccineReady) {
        case 'Ready':
          this.icon = 'far fa-check-circle'
          this.color = 'text-green-500'
          break
        case 'Not Ready':
          this.icon = 'far fa-times-circle'
          this.color = 'text-red-500'
          break
        case 'Pending':
          this.icon = 'far fa-hourglass'
          this.color = 'text-blue-500'
          break
      }
    }
  }
})
</script>
