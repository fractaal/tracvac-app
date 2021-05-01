<template>
  <q-page class="p-8">
    <h4 class="m-0 font-light">NOTIFICATIONS</h4>
    <div>
      <br>
      <p class="m-0 p-0 font-light">NOTIFICATION TITLE</p>
      <q-input v-model="active.title" outlined/>
      <br>
      <p class="m-0 p-0 font-light">NOTIFICATION CONTENT</p>
      <q-editor v-model="active.content"/>
      <br>
      <q-btn :loading="loading" class="block p-2 ml-auto" icon="fas fa-check" rounded outline label="Done" @click="submit()"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AddNotification',
  data() {
    return {
      loading: false,
      active: {
        title: '',
        content: '',
      }
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await this.$axios.post('/admin/postNotification', {title: this.active.title, content: this.active.content})
        this.$q.notify({message: 'Notification posted!', type: 'positive'});
        await this.$router.push('/notif');
      } catch(e) {
        this.$q.notify({
          message: `Notification post failed: ${(e as Error).message}`,
          type: 'negative'
        })
      }
      this.loading = false;
    }
  }
});
</script>

<style>

</style>