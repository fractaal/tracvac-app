<template>
  <q-page class="column content-center bg-blue-900">
    <img src="~assets/tracvac-logo.png" class="w-1/2 mt-44 bobbing bobbing-fast" alt="" />
    <div class="text-4xl text-center logo-text text-white">Tracvac</div>
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
      NavigationBar.hide()
      NavigationBar.backgroundColorByHexString('#1e3a8a', false)
    }
  }
})
</script>
