<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <h5 class="px-8 mt-12 m-0 font-bold truncate">{{store.serverConfig.location}}</h5>
      <p class="px-8 mb-2">TRACVAC ADMINISTRATOR</p>
      <q-list class="my-auto blo">
        <q-item clickable v-ripple class="p-12" @click="$router.push('/')">
          <q-item-section avatar>
            <q-icon color="primary" name="person" size="lg"/>
          </q-item-section>

          <q-item-section class="text-lg">
            <b>People</b>
            <i class="text-sm">Change vaccination status of people on this site.</i>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="p-12" @click="$router.push('/notif')">
          <q-item-section avatar>
            <q-icon color="primary" name="announcement" size="lg" />
          </q-item-section>

          <q-item-section class="text-lg">
            <b>Notifications</b>
            <i class="text-sm">Push notifications to everyone on this site.</i>
           </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="p-12" @click="$router.push('/view-logs')">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-pen" size="lg" />
          </q-item-section>

          <q-item-section class="text-lg">
            <q-badge class='mr-4' color='red' floating v-if='store.unreadLogsCount !== 0'>
              {{store.unreadLogsCount}}
            </q-badge>
            <b>Logs</b>
            <i class="text-sm">Logs users have created.</i>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="p-12" @click="$router.push('/insight')">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-lightbulb" size="lg" />
          </q-item-section>

          <q-item-section class="text-lg">
            <b>Insight</b>
            <i class="text-sm">Data analytics.</i>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="p-12" @click="$router.push('/config')">
          <q-item-section avatar>
            <q-icon color="primary" name="settings" size="lg"/>
          </q-item-section>

          <q-item-section class="text-lg">
            <b>Configuration</b>
            <i class="text-sm">View Tracvac Server configuration.</i>
           </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
      <q-page-sticky :offset='[20, 20]' position="bottom-left">
        <q-btn
          fab
          class='mr-2'
          color='primary'
          icon="keyboard_arrow_left"
          @click="$router.back()"
        />
        <q-btn
          fab
          class='mr-2'
          color='primary'
          icon="keyboard_arrow_right"
          @click="$router.forward()"
        />
        <q-btn
          fab
          label='Show/hide menu'
          color="secondary"
          icon="remove_red_eye"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import store from '../api/store'
import Vue from 'vue';

export default Vue.extend({
  name: 'MainLayout',
  async created() {
    this.store.unreadLogsCount = (await store.axios.post('/admin/getUnreadLogsCount')).data.count
  },
  data() {
    return {
      store,
      leftDrawerOpen: false,
    }
  }
});
</script>
