<template>
  <q-page class="column mx-12">
    <div class="text-h3 logo-text border-2 border-blue-400 mt-48">Hello!</div>
    <p>To get started, let's type in the address of your local Tracvac site.</p>
    <br>
    <q-input
      outlined
      rounded
      placeholder="http://your-local-site.gov"
      v-model="address"
      :rules="[
        val => siteValidator(val) || 'Please input a valid site.'
      ]"
      autofocus
      />
    <q-btn :disabled="isDisabled" flat outlined class="btn btn--primary bg-blue-400 text-white rounded-2xl my-5 px-14 shadow focus:outline-none focus:ring-2 focus:ring-blue-600" :loading="isLoading" @click="connectToReception">Continue</q-btn>
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
    if (window.StatusBar) {
      StatusBar.backgroundColorByHexString('#fff')
      StatusBar.styleDefault()
    }
  },
  computed: {
    isDisabled: function (): boolean {
      return !this.siteValidator(this.address)
    }
  },
  methods: {
    siteValidator (value: string) {
      if (value.search(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g) !== -1) {
        return true
      } else if (value.search(/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/) !== -1) {
        return true
      } else {
        return false
      }
    },
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
