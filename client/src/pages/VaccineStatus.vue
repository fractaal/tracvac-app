<template>
  <q-page class="px-8">
    <h5 class="font-bold mt-8 p-0">Vaccine Status</h5>
    <div class="p-8 mb-8 border-solid border-blue-500 shadow-lg rounded-lg text-center">
      <q-icon class="block mx-auto" :name="store.userInfo.isVaccinated ? 'fas fa-check' : 'fas fa-times'" size="196px"/>
      <p class="m-0 font-bold">Your vaccine is {{store.userInfo.isVaccineReady.toLowerCase()}}.</p>
      <i>Check back soon! We'll notify you once it is.</i>
    </div>
  </q-page>
</template>

<script lang="ts">
import { store } from '../api/store'
import Vue from 'vue'

export default Vue.extend({
  name: 'Profile',
  data () {
    return {
      store
    }
  }
})
</script>
