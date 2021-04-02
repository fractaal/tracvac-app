<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { setConfig, getConfig } from './api/config'
import store from './api/store'
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  async created() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = await getConfig()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!response.isConfigured) {
      this.$q.dialog({cancel: false, title: 'Configure me first!', message: 'Before this Tracvac site can be used, we need to perform a pre-flight check.'})
      await this.$router.push('/config');
    }
  },
});
</script>
