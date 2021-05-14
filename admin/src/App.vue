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
  }
});
</script>
