<template>
  <img class="block rounded-full shadow-xl ring-4 ring-white" :src="fullPath" alt="">
</template>

<script lang="ts">
import Vue from 'vue'
import { store } from 'src/api/store'
import path from 'path'
import { LocalStorage } from 'quasar'

export default Vue.extend({
  name: 'ProfilePicture',
  created () {
    // @ts-ignore
    this.fullPath = new URL(store.userInfo?.profilePicturePath, LocalStorage.getItem('server'))
  },
  data () {
    return {
      store,
      fullPath: ''
    }
  },
  watch: {
    'store.userInfo.profilePicturePath': function () {
      // @ts-ignore
      this.fullPath = new URL(store.userInfo?.profilePicturePath, LocalStorage.getItem('server'))
    }
  }
})
</script>

<style scoped>

</style>
