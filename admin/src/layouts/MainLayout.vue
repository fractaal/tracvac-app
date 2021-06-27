<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="lHh lpr lFf"> 
    <q-footer class="bg-white text-black shadow-lg border-2 border-solid border-gray-200 overflow-x-auto">
      <q-toolbar class="p-4">
        <!-- <q-btn flat round dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" /> -->
        <q-btn flat round dense icon="keyboard_arrow_left" @click="$router.back()" />
        <q-btn flat round dense icon="keyboard_arrow_right" @click="$router.forward()" />
        <q-toolbar-title>
          {{store.serverConfig.name}} - <strong>Tracvac</strong> Administrator
          <p class="m-0 -my-1 text-sm">at <b>{{store.serverConfig.location}}</b></p>
        </q-toolbar-title>
        <q-btn flat rounded name="images" label="People" icon="person" @click="$router.push('/')"/>
        <q-btn flat rounded name="videos" label="Notifications" icon="announcement" @click="$router.push('/notif')"/>
        <q-btn flat rounded name="articles" label="Logs" icon="fas fa-pen" @click="$router.push('/view-logs')"/>
        <q-btn flat rounded name="articles" label="Insight" icon="fas fa-lightbulb" @click="$router.push('/insight')"/>
        <q-btn flat rounded name="articles" label="Configuration" icon="settings" @click="$router.push('/config')"/>
      </q-toolbar>
    </q-footer >
    <!-- <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <h5 class="px-8 m-0 -my-1 mt-8 font-bold truncate">{{store.serverConfig.name}}</h5>
      <p class="px-8 m-0 -my-1">at <b>{{store.serverConfig.location}}</b></p>
      <p class="p-0 m-0 px-8 mb-2 text-sm">on TracVac <b>{{require('../../../package.json').version}}</b></p>
      <q-list class="my-auto blo">
        <q-item clickable v-ripple class="px-12 py-8" @click="$router.push('/')">
          <q-item-section avatar>
            <q-icon color="primary" name="person" size="lg"/>
          </q-item-section>

          <q-item-section class="text-lg">
            <b>People</b>
            <i class="text-sm">Change vaccination status of people on this site.</i>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="px-12 py-8" @click="$router.push('/notif')">
          <q-item-section avatar>
            <q-icon color="primary" name="announcement" size="lg" />
          </q-item-section>

          <q-item-section class="text-lg">
            <b>Notifications</b>
            <i class="text-sm">Push notifications to everyone on this site.</i>
           </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="px-12 py-8" @click="$router.push('/view-logs')">
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
        <q-item clickable v-ripple class="px-12 py-8" @click="$router.push('/insight')">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-lightbulb" size="lg" />
          </q-item-section>

          <q-item-section class="text-lg">
            <b>Insight</b>
            <i class="text-sm">Data analytics.</i>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="px-12 py-8" @click="$router.push('/config')">
          <q-item-section avatar>
            <q-icon color="primary" name="settings" size="lg"/>
          </q-item-section>

          <q-item-section class="text-lg">
            <b>Configuration</b>
            <i class="text-sm">View Tracvac Server configuration.</i>
           </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
      <!-- <q-page-sticky :offset='[20, 20]' position="bottom-left"> -->
      <!-- </q-page-sticky> -->
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import store from 'src/api/store'
import Vue from 'vue';
import loadPlugin from 'src/api/plugin'

export default Vue.extend({
  name: 'MainLayout',
  async created() {
    this.store.unreadLogsCount = (await store.axios.post('/admin/getUnreadLogsCount')).data.count

    const { data: pluginPaths } = await store.axios.get('/admin/plugin')
    for (const pluginPath of pluginPaths) {
      const plugin = await loadPlugin(pluginPath)
      console.log(plugin)
      await (plugin as any).init(this)
    }
  },
  data() {
    return {
      store,
      leftDrawerOpen: false,
    }
  }
});
</script>
