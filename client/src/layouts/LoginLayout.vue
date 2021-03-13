<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
        <transition :enter-active-class="`animated ${transition.in}`" :leave-active-class="`animated ${transition.out}`" mode="out-in" :duration="300">
          <router-view/>
        </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import transition from '../transitions'
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginLayout',
  data () {
    return {
      transition
    }
  }
})
</script>
