<template>
  <q-page class="py-8"> 
    <!-- TODO: Consistent design language with Tracvac People & Tracvac Insight -->
    <div class="m-0 py-8 px-8 bg-blue-200">
      <div class="m-0 font-light text-sm">YOU'RE RUNNING</div>  
      <h4 class="m-0 font-black">TRACVAC {{require('../../../package.json').version}}</h4>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="mt-16 mx-auto w-3/4">
        <h6 class="m-0 m-0 p-0">GENERAL</h6>
        <q-input class="" label="Name" v-model="store.serverConfig.name" disable/>
        <p class="my-1">The name of this Tracvac site. It could be the company name, or the name of the LGU, so long as it's a good indicator of who's hosting this site.</p>
        <q-input class="mt-2" label="Location" v-model="store.serverConfig.location" disable/>
        <p class="my-1">Where is this Tracvac site physically situated in?</p>
        <q-input class="mt-2" :label="`${this.store.serverConfig.name} website`" v-model="store.serverConfig.websiteUrl" disable/>
        <p class="my-1">Website address of {{store.serverConfig.name}}, if there is one.<br><i>Note: If you leave this blank, the button that leads to the website in the app will not be shown.</i></p>
        <q-input class="mt-2" label="HTTP Port" v-model="store.serverConfig.httpPort" type="number" disable/>
        <p class="my-1">Port number that the server will listen to for HTTP requests. Defaults to 80.</p>
        <q-input class="mt-2" label="HTTPS Port" v-model="store.serverConfig.httpsPort" type="number" disable/>
        <p class="my-1">Port number that the server will listen to for HTTPS requests. Defaults to 443.</p>
      </div>
      <div class="mt-16 mr-32">
        <h6 class="m-0 p-0 font-black">Why can't I change them here?</h6>
        <p>
          Because of the way Tracvac Server is designed, important configuration settings like this cannot be changed on-the-fly.
          Modify the .env file to change settings, and restart Tracvac Server for the changes to take effect.
        </p>
      </div>
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
