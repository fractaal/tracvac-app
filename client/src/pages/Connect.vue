<template>
  <q-page key="connect" class="column mx-12">
    <img src="~assets/tracvac-logo.png" class="mx-auto mt-16 mb-8 w-3/4" alt="">
    <div class="text-h3 logo-text border-2 border-blue-400">Hello!</div>
    <p>To get started, let's type in the address of your local Tracvac site.</p>
    <br>
    <input placeholder="https://your-local-site.gov" type="text" v-model="address" class="full-width focus:ring-2 focus:ring-blue-400 p-4 rounded-2xl focus:outline-none border-none shadow"/>
    <q-btn flat outlined class="btn btn--primary bg-blue-400 text-white rounded-2xl my-5 px-14 shadow focus:outline-none focus:ring-2 focus:ring-blue-600" :loading="isLoading" @click="connectToReception">Continue</q-btn>
  </q-page>
</template>

<script lang="ts">
import { recept } from '../api/server'
import Vue from 'vue'

export default Vue.extend({
  name: 'Connect',
  data () {
    return {
      isLoading: false,
      address: ''
    }
  },
  created () {
    StatusBar.backgroundColorByHexString('#fff')
    StatusBar.styleDefault()
  },
  methods: {
    async connectToReception () {
      this.isLoading = true
      if (await recept(this.address)) {
        this.$q.localStorage.set('server', this.address)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await this.$router.push('/login')
      }
      this.isLoading = false
    }
  }
})
</script>
