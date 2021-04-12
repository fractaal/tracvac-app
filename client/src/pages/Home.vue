<template>
  <q-page class="px-8">
    <q-pull-to-refresh @refresh="reload">
      <div class="flex flex-row justify-between pt-8 items-center">
        <h5 class="font-bold m-0 p-0">Hello, {{store.userInfo.firstName}}!</h5>
        <profile-picture class="w-10 h-10"/>
      </div>
      <div v-if="JSON.stringify(store.recentlyViewed) !== '{}'">
        <p class="font-bold mt-8 mb-2 p-0 text-gray-500">RECENTLY VIEWED</p>
        <large-button-card
          :title="store.recentlyViewed.name"
          :description="store.recentlyViewed.description"
          :icon="store.recentlyViewed.icon"
          @click="store.recentlyViewed.action"
          class="bg-blue-500 text-white"
        />
      </div>
      <!--
      <q-file v-model="file"/>
      <button-card title="upload pic" icon="fas fa-check" @click="uploadProfilePicture(file)"/>
      -->
      <div v-for="menuItem in store.menu" :key="menuItem.name">
        <p v-if="menuItem.isSeparator" class="font-bold mt-8 mb-2 p-0 text-gray-500">{{menuItem.name}}</p>
        <button-card v-else :title="menuItem.name" :icon="menuItem.icon" @click="menuItem.action" :show-badge="menuItem.showBadge"/>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadProfilePicture } from '../api/user'
import { store } from '../api/store'

import ButtonCard from '../components/ButtonCard.vue'
import ProfilePicture from 'components/ProfilePicture.vue'
import LargeButtonCard from 'components/LargeButtonCard.vue'
import startup from 'src/api/startup'

const _ = import('src/api/background')

export default Vue.extend({
  name: 'Home',
  components: { LargeButtonCard, ButtonCard, ProfilePicture },
  activated () {
    startup()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/register') {
      next(false)
    } else {
      next()
    }
  },
  data () {
    return {
      store
    }
  },
  methods: {
    uploadProfilePicture,
    async reload (done: Function) {
      await startup()
      done()
    }
  }
})
</script>
