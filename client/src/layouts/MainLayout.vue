<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <transition
          :enter-active-class="`animated ${transition.in}`"
          :leave-active-class="`animated ${transition.out}`"
          mode="out-in"
          :duration="100">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
      <q-footer class="bg-white shadow-5 rounded-t-2xl mx-4">
        <q-tabs
          v-model="store.activeRoute"
          class="text-black rounded-t-2xl"
        >
          <q-tab
            name="/profile"
            icon="fas fa-user"
            label="Profile"
            @click="$router.push('/profile')"
            :class="store.activeRoute === '/profile' ? 'text-blue-500' : ''"
          />
          <q-tab
            name="/home"
            icon="fas fa-home"
            label="Home"
            @click="$router.push('/home')"
            :class="store.activeRoute === '/home' ? 'text-blue-500' : ''"
          />
          <q-tab
            name="/logs"
            icon="fas fa-pen-fancy"
            label="Logs"
            @click="$router.push('/logs')"
            :class="store.activeRoute === '/logs' ? 'text-blue-500' : ''"
          />
        </q-tabs>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import transition from '../transitions'
import { store } from 'src/api/store'

import Vue from 'vue'

export default Vue.extend({
  name: 'MainLayout',
  data () {
    return {
      store,
      transition
    }
  }
})
</script>
