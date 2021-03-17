<template>
  <div id="q-app">
    <transition :enter-active-class="`animated ${transition.in}`" :leave-active-class="`animated ${transition.out}`" mode="out-in" :duration="300">
      <router-view/>
    </transition>
  </div>
</template>
<script lang="ts">
import transition from './transitions'
import { recept } from './api/server'
import { loginWithToken } from './api/auth'
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data () {
    return {
      transition
    }
  },
  async created () {
    // Show splash screen
    await this.$router.push('/')

    // Check whether or not user has already set an address to connect to
    const server: string|null = this.$q.localStorage.getItem('server')

    // Artificial delay to show the logo
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (server) {
      // Connect to the server and go to the login screen.
      if (await recept(server)) {
        if (await loginWithToken()) {
          await this.$router.push('/home')
        } else {
          await this.$router.push('/login')
        }
      } else {
        await this.$router.push('/connect')
      }
    } else {
      // Go to the server connecet screen otherwise
      await this.$router.push('/connect')
    }

    if (window.NavigationBar) {
      NavigationBar && NavigationBar.show()
    }
  }
})
</script>
