<template>
  <q-page class="p-8">
    <tracvac-header title="NEW NOTIFICATION" description=""/>
    <div>
      <br>
      <p class="m-0 p-0 font-light">NOTIFICATION TITLE</p>
      <q-input v-model="active.title" outlined/>
      <br>
      <p class="m-0 p-0 font-light">NOTIFICATION CONTENT</p>
      <q-editor v-model="active.content"/>
      <br>
      <div class="flex justify-end">
        <q-btn :loading="loading" class="block p-2 mr-4" icon="fas fa-times" outline rounded color="negative" label="Cancel" @click="$router.back()"/>
        <q-btn :loading="loading" class="block p-2" icon="fas fa-check" unelevated rounded color="primary" label="POST!" @click="submit()"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import TracvacHeader from 'components/TracvacHeader.vue'

export default Vue.extend({
  name: 'AddNotification',
  components: { TracvacHeader },
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