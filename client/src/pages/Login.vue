<template>
  <q-page class="column">
    <div class="bg-blue-500 text-white pb-8 px-12 rounded-b-3xl">
      <img src="~assets/tracvac-logo.png" alt="" class="block mt-16 mx-auto w-48"/>
      <h4 class="logo-text m-0 p-0 text-center">Tracvac</h4>
      <p class="text-center">Your friendly digital vaccine passport</p>
    </div>
    <br>
    <div class="mx-12 rounded-2xl border-2 border-solid border-blue-500">
      <div class="mt-8 mx-4">
        <q-input rounded class="mb-2" outlined v-model="username" label="Username"/>
        <q-input rounded v-model="password" outlined :type="isPassword? 'password' : 'text'" label="Password">
          <template v-slot:append>
            <q-icon
              :name="isPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPassword= !isPassword"
            />
          </template>
        </q-input>
      </div>
      <q-btn outline rounded class="block mx-auto px-5 mb-4 my-4 py-2" color="primary" @click="login" :loading="isLoggingIn" :disable="isLoginDisabled">Log in</q-btn>
    </div>
    <div class="mt-auto mx-auto">
      <p><b>Or, you could also <router-link to="/register">create an account</router-link>.</b></p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { isAuthed, login } from '../api/auth'
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
    } else if ((to.path === '/home' && !isAuthed()) || to.path === '/') {
      next(false)
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
