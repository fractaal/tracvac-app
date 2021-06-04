<template>
  <q-page class="p-8">
    <h4 class="m-0 font-light">NOTIFICATIONS</h4>
    <div class="mt-4 flex flex-row">
      <q-btn rounded outline class="p-2" @click="$router.push('/addNotif')" icon="fas fa-plus" label="Post Notification"/>
    </div>
    <div class="mt-4">
      <q-card class="mb-8 shadow-xl rounded-2xl ring-4 ring-gray-300" v-for="notification in notifications" :key="notification.id">
        <q-card-section>
          <div class="flex flex-row justify-between">
            <h5 class="m-0 p-0">{{notification.title}}</h5>
            <div>
              <q-btn class="block ml-auto mb-2" rounded outline icon="fas fa-trash" label="Delete" @click="deleteNotification(notification.id)"/>
              <p>Created on {{notification.createdAt}}</p>
            </div>
          </div>
          <p v-html="notification.content"></p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Notifications',
  async activated() {
    await this.loadData();
  },
  data() {
    return {
      notifications: [],
    }
  },
  methods: {
    async loadData() {
      const response = await this.$axios.post('/admin/getNotifications', {pageSize: 0, page: 0});
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.notifications = response.data;
    },
    async deleteNotification(id: number) {
      console.log('clicked')
      try {
        const response = await this.$axios.post('/admin/deleteNotification', {notificationId: id});
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (response.data.result) {
          this.$q.notify({
            message: 'Notification deleted!',
            type: 'positive',
          })
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          throw new Error(response.data.message);
        }
      } catch(e) {
        this.$q.notify({
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: `Deletion of notification failed! ${e}`,
          type: 'negative',
        })
      }
      await this.loadData();
    }
  }
});
</script>