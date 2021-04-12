<template>
  <q-page class="column content-center">
    <img src="~assets/tracvac-logo.png" class="w-64 mt-44 bobbing bobbing-fast mx-auto" alt="" />
    <div class="text-4xl text-center logo-text">Tracvac</div>
    <p class="m-0 p-0 text-center">Your friendly digital vaccine passport</p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Splash',
  created () {
    if (window.StatusBar && window.NavigationBar) {
      StatusBar.styleLightContent()
      StatusBar.backgroundColorByHexString('#1e3a8a')
    }
  }
})
</script>
