<template>
  <q-page>
    <q-pull-to-refresh @refresh="getUserInfo">
      <custom-header title="Profile" class="bg-blue-500 text-white m-0"/>
      <div class="bg-blue-500 p-8 -mt-12 text-white mb-8 rounded-b-3xl">
        <profile-picture class="block mx-auto w-24 h-24"/>
        <h5 class="my-5 text-center text-bold">{{store.userInfo.firstName}} {{store.userInfo.middleName}} {{store.userInfo.lastName}}</h5>
      </div>
      <div class="px-8">
        <div class="p-4 mb-8 border border-solid border-gray-200 rounded-lg text-center">
          <q-badge label="NEW" color="red" class="float-right" v-if="store.changeInVaccinationStatus"/>
          <q-icon class="text-blue-500 block mx-auto" :name="store.userInfo.isVaccinated ? 'fas fa-check-circle' : 'fas fa-times-circle'" size="128px"/>
          <p class="m-0 mt-4 font-bold">{{store.userInfo.isVaccinated ? 'You are vaccinated' : 'You are not vaccinated'}}</p>
          <p class="text-xs"><i>Please check the vaccine status tab for more details.</i></p>
        </div>
        <button-card @click="$router.push('/personal-info')" icon="fas fa-user" title="Personal Information"/>
        <button-card :show-badge="store.changeInVaccineStatus" @click="$router.push('/vaccine')" icon="fas fa-syringe" title="Vaccine Status"/>
        <button-card @click="$router.push('/view-log')" icon="fas fa-pen-fancy" title="Create A Log"/>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import { store } from '../api/store'
import { getUserInfo } from 'src/api/user'
import Vue from 'vue'

import ButtonCard from '../components/ButtonCard.vue'
import ProfilePicture from 'components/ProfilePicture.vue'
import CustomHeader from 'components/CustomHeader.vue'
import startup from 'src/api/startup'

export default Vue.extend({
  name: 'Profile',
  components: { ProfilePicture, ButtonCard, CustomHeader },
  data () {
    return {
      store
    }
  },
  beforeRouteLeave (to, from, next) {
    if (store.changeInVaccinationStatus) {
      store.changeInVaccinationStatus = false
    }
    next()
  },
  methods: {
    async getUserInfo (done: () => void) {
      await getUserInfo()
      await startup()
      done()
    }
  }
})
</script>
