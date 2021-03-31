<template>
  <q-page>
    <custom-header title="Notifications"/>
    <div class="px-8">
      <div
        class="rounded-lg p-4 border border-solid border-gray-200 mb-4"
        v-for="notification in store.notifications"
        :key="notification.title"
      >
        <p class="text-h4 m-0">{{notification.title}}</p>
        <p class="m-0" v-html="notification.content"></p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { getNotifications } from 'src/api/notification'
import { store } from 'src/api/store'

import CustomHeader from 'components/CustomHeader.vue'

export default Vue.extend({
  name: 'Notifications',
  components: { CustomHeader },
  async activated () {
    await getNotifications()
  },
  data () {
    return {
      store
    }
  }
})
</script>

<style scoped>

</style>
