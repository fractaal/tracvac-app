<template>
  <div>
    <q-img class="rounded-full shadow-xl ring-4 ring-white" :src="fullPath" ratio="1">
      <q-menu>
        <q-list>
          <q-item clickable v-ripple v-close-popup>
            <q-item-section @click="$router.push('/change-profile-picture')">
              Change Profile Picture
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-img>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { store } from 'src/api/store'
import { LocalStorage } from 'quasar'

export default Vue.extend({
  name: 'ProfilePicture',
  created () {
    this.getProfilePicturePath()
  },
  methods: {
    getProfilePicturePath () {
      this.errored = false
      // @ts-ignore
      this.fullPath = this.errored ? '/profile-placeholder.png' : store.userInfo?.profilePicturePath
        ? new URL(store.userInfo?.profilePicturePath, LocalStorage.getItem('server') as string)
        : '/profile-placeholder.png'
    }
  },
  data () {
    return {
      errored: false,
      store,
      fullPath: ''
    }
  },
  watch: {
    'store.userInfo.profilePicturePath': function () {
      this.getProfilePicturePath()
    }
  }
})
</script>

<style scoped>

</style>
