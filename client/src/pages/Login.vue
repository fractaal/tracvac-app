<template>
  <q-page class="column items-center">
    <div class="m-0 p-0 font-serif text-h1 mt-56">💖</div>
    <p class="m-0 p-0">Amazing.</p>
    <br><br>
    <div class="column items-center w-3/5">
      <div class="full-width">
        <input placeholder="Username" v-model="username" type="text" label="Username" class="full-width focus:ring-2 focus:ring-red-600 p-4 rounded-full focus:outline-none border-none shadow"/>
      </div>
      <br>
      <div class="full-width relative text-red-500">
        <span class="absolute inset-y-0 right-5 flex items-center pl-2">
          <q-icon class="cursor-pointer" :name="isPassword ? 'visibility' : 'visibility_off'" size="sm" @click="isPassword = !isPassword"/>
        </span>
        <input :type="isPassword ? 'password' : 'text'" placeholder="Password" v-model="password" class="full-width focus:ring-2 focus:ring-red-600 p-4 rounded-full focus:outline-none border-none shadow">
      </div>
      <q-btn rounded flat outlined class="btn btn--primary bg-red-500 text-white q-my-md shadow focus:outline-none focus:ring-2 focus:ring-purple-600" padding="lg" :loading="isLoggingIn" @click="login">WAWAWIWA</q-btn>
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
  methods: {
    async login () {
      this.isLoggingIn = true
      await login(this.username, this.password)
      this.isLoggingIn = false
    }
  }
})
</script>
