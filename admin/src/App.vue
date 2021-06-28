<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getConfig } from './api/config';

export default Vue.extend({
  name: 'App',
  created() {
    void getConfig()
    this.$q.loadingBar.setDefaults({size: '10px'})

    /**
     * Because of the way plugins are initialized, they are not necessarily ready at application load.
     * So, if there's a hash present, a plugin page might be desired , but it won't be loaded yet. 
     * Therefore, we delay it for a second or two to give the application a chance to load.
     */
    if (window.location.hash !== '#/') {
      this.$q.loading.show({message: 'Give me a second...'})
      const desiredPath = window.location.hash.substring(1, window.location.hash.length)
      this.$router.push('/')
      setTimeout(() => this.$router.push(desiredPath), 1000)
      this.$q.loading.hide()
    }
  }
});
</script>
