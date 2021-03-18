<template>
  <q-page class="column mx-12">
    <div>
      <h1 class="logo-text">Login</h1>
    </div>
    <div class="mt-4 full-width">
      <q-input rounded class="mb-2" outlined v-model="username" label="Username" :rules="[
        val => !!val || 'Your username can\'t be empty.'
      ]"/>
      <q-input rounded v-model="password" outlined :type="isPassword? 'password' : 'text'" label="Password" :rules="[
        val => !!val || 'Your password can\'t be empty.'
      ]">
        <template v-slot:append>
          <q-icon
            :name="isPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPassword= !isPassword"
          />
        </template>
      </q-input>
    </div>
    <br>
    <q-btn outline rounded class="px-5 py-2" color="primary" @click="login" :loading="isLoggingIn" :disable="isLoginDisabled">Log in</q-btn>
    <div class="mt-auto mb-4">
      <p><b>Or, you could also <router-link to="/register">create an account</router-link>.</b></p>
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
  computed: {
    isLoginDisabled: function (): boolean {
      return this.username.length === 0 || this.password.length === 0
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
    } else {
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
          message,
          timeout: 2500,
          position: 'center'
        })
      }
    }
  }
})
</script>
