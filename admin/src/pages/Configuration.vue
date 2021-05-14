<template>
  <q-page class="p-8">
    <h4 class="m-0 font-light">CONFIGURATION</h4>
    <div class="my-8 mx-auto w-1/2">
      <q-input class="mt-8" label="Name" v-model="store.serverConfig.name" disable/>
      <p class="my-1">The name of this Tracvac site. It could be the company name, or the name of the LGU, so long as it's a good indicator of who's hosting this site.</p>
      <q-input class="mt-8" label="Location" v-model="store.serverConfig.location" disable/>
      <p class="my-1">Where is this Tracvac site physically situated in?</p>
      <q-input class="mt-8" label="Local Government Unit Website" v-model="store.serverConfig.lguUrl" disable/>
      <p class="my-1">Website address of this LGU.<br><i>Note: If you leave this blank, the button that leads to the LGU website in the app will not be shown.</i></p>
      <q-input class="mt-8" label="HTTP Port" v-model="store.serverConfig.httpPort" type="number" disable/>
      <p class="my-1">Port number that the server will listen to for HTTP requests. Defaults to 80.</p>
      <q-input class="mt-8" label="HTTPS Port" v-model="store.serverConfig.httpsPort" type="number" disable/>
      <p class="my-1">Port number that the server will listen to for HTTPS requests. Defaults to 443.</p>
    </div>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Vue from 'vue';
import { getConfig, setConfig } from '../api/config'
import store from 'src/api/store';

export default Vue.extend({
  name: 'Configuration',
  components: {},
  async mounted() {
    await getConfig();
  },
  data() {
    return {
      isLoading: false,
      store
    }
  },
});
</script>
