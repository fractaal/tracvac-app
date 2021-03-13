<template>
  <q-page class="column items-center" key="login">
    <img src="~assets/tracvac-logo.png" class="mx-auto mt-16 w-1/2" alt="">
    <div class="text-h4 logo-text border-2 border-blue-400">Log in</div>
    <br><br>
    <div class="w-full p-8">
      <div class="full-width">
        <input placeholder="Username" v-model="username" type="text" label="Username" class="full-width focus:ring-2 focus:ring-blue-400 p-4 rounded-2xl focus:outline-none border-none shadow"/>
      </div>
      <br>
      <div class="full-width relative text-blue">
        <span class="absolute inset-y-0 right-5 flex items-center pl-2">
          <q-icon class="cursor-pointer" :name="isPassword ? 'visibility' : 'visibility_off'" size="sm" @click="isPassword = !isPassword"/>
        </span>
        <input :type="isPassword ? 'password' : 'text'" placeholder="Password" v-model="password" class="full-width focus:ring-2 focus:ring-blue-600 p-4 rounded-2xl focus:outline-none border-none shadow">
      </div>
      <q-btn flat outlined class="btn btn--primary bg-blue-400 text-white rounded-2xl my-5 py-2 px-8 shadow focus:outline-none focus:ring-2 focus:ring-blue-600" :loading="isLoggingIn" @click="login">LOG IN</q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { login } from '../api/auth'
import Vue from 'vue'

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      isPassword: true,
      isLoggingIn: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/connect') {
      this.$q.dialog({
        title: 'Go back?',
        message: 'Are you sure you want to go back to the site address selection screen?',
        ok: true,
        cancel: true
      }).onOk(() => {
        next()
      }).onCancel(() => {
        next(false)
      })
    } else if (to.path === '/home') {
      next()
    }
  },
  methods: {
    async login () {
      this.isLoggingIn = true
      const [status, message] = await login(this.username, this.password)
      this.isLoggingIn = false

      if (status) {
        await this.$router.push('/home')
      } else {
        this.$q.notify({
          type: 'negative',
          message
        })
      }
    }
  }
})
</script>
