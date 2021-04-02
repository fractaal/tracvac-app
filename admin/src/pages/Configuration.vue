<template>
  <q-page class="p-8">
    <h4 class="m-0 font-light">CONFIGURATION</h4>
    <div class="my-8 mx-auto w-1/2">
      <q-input class="mt-8" label="Municipality" v-model="newServerConfig.location"/>
      <p class="my-2">Where is this Tracvac site physically situated in?</p>
      <q-input class="mt-8" label="Local Government Unit Website" v-model="newServerConfig.lguUrl" :rules="[siteValidator]"/>
      <p class="my-2">Website address of this LGU.<br><i>Note: If you leave this blank, the button that leads to the LGU website in the app will not be shown.</i></p>
      <q-input class="mt-8" label="Secret Key" v-model="newServerConfig.secret"/>
      <p class="my-2">
        Secret key for this Tracvac site. Used for user authentication. 
        The more random the secret key, the better.<br><br>
        <b>The secret key is ideally set <i>once.</i> If you change the secret key once this server is configured, any logged in users will be logged out.</b>
        </p>
      <q-input class="mt-16" label="HTTP Port" v-model="newServerConfig.httpPort" type="number" :rules="[portRules]"/>
      <p class="my-2">Port number that the server will listen to for HTTP requests. Defaults to 80.</p>
      <q-input class="mt-8" label="HTTPS Port" v-model="newServerConfig.httpsPort" type="number" :rules="[portRules]"/>
      <p class="my-2">Port number that the server will listen to for HTTPS requests. Defaults to 443.</p>
      <q-btn label="Save" icon="save" :loading="isLoading" @click="submit" flat class="block ml-auto border border-solid border-blue-500 text-blue-500 p-2 rounded-lg"/>
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
    this.newServerConfig = Object.assign({}, this.newServerConfig, store.serverConfig);
  },
  data() {
    return {
      isLoading: false,
      newServerConfig: {
        location: '',
        lguUrl: '',
        secret: '',
        httpPort: 80,
        httpsPort: 443,
      }
    }
  },
  /** 
  beforeRouteLeave(from, to, next) {
    this.$q.dialog({
      title: 'Discard changes?',
      message: 'If you leave the configuration page, any changes will be discarded.',
      cancel: true
    }).onOk(() => {
      next();
    }).onCancel(() => {
      next(false);
    })
  },*/
  methods: {
    async submit () {
      this.isLoading = true;
      await setConfig(this.newServerConfig);
      this.isLoading = false;
    },
    portRules(val: number) {
      if (val > 0 && val < 65535) {
        return true;
      } else return 'Must be a number ranging from 0 to 65535.';
    },
    siteValidator (value: string) {
      if (value.search(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g) !== -1) {
        return true
      } else if (value.search(/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/) !== -1) {
        return true
      } else {
        return 'Must be a valid site address.'
      }
    },
  }
});
</script>
