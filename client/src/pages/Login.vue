<template>
  <q-page class="column items-center justify-evenly">
    <div class="text-h1">Log in</div>
    <div class="flex flex-center">
      <q-input class="full-width q-my-xs" v-model="username" filled label="Username"/>
      <q-input class="full-width q-my-xs" v-model="password" filled :type="isPassword ? 'password' : 'text'" label="Password">
        <template v-slot:append>
          <q-icon
            :name="isPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPassword = !isPassword"
          />
        </template>
      </q-input>
      <br>
      <q-btn rounded flat outlined class="q-my-md" padding="lg" :loading="isLoggingIn" @click="login">WAWAWIWA</q-btn>
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
