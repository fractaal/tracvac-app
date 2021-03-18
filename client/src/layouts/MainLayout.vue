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
      <q-footer class="bg-white shadow-lg">
        <q-tabs
          v-model="activeTab"
          class="text-black shadow-lg px-4 rounded-t-md"
        >
          <q-tab name="Profile" icon="fas fa-user" label="" @click="$router.push('/profile')" />
          <q-tab name="Home" icon="fas fa-home" label="" @click="$router.push('/home')" />
          <q-tab name="Logs" icon="fas fa-pen-fancy" label="" @click="$router.push('/logs')"/>
        <q-tab name="Vaccine" icon="fas fa-syringe" label="" @click="$router.push('/vaccine')"/>
        </q-tabs>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import transition from '../transitions'

import Vue from 'vue'

export default Vue.extend({
  name: 'MainLayout',
  data () {
    return {
      transition,
      activeTab: ''
    }
  }
})
</script>
