<template>
  <q-page>
    <div class="bg-blue-500 p-8 -mt-8 text-white mb-8">
      <h5 class="font-bold p-0 -mb-12">Profile</h5>
      <img class="block rounded-full w-24 h-24 shadow-xl ring-4 ring-white mx-auto mt-12" src="https://scontent.fcgm1-1.fna.fbcdn.net/v/t1.0-9/108012281_4159685177435556_4897495128471841120_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeGiNrSFbi267lwk7qel8tU1aibkznHdiKBqJuTOcd2IoBXIrAQEUKqTx5GPHA2SuWxIQ4uO6-mI9yHZc0TLKHsz&_nc_ohc=N2zl5l7lIEwAX_42vDl&_nc_ht=scontent.fcgm1-1.fna&oh=ec05ca8bbea95273501bf746b7bc4576&oe=60783494" alt="">
      <h5 class="my-5 text-center text-bold">{{store.userInfo.firstName}} {{store.userInfo.middleName}} {{store.userInfo.lastName}}</h5>
    </div>
    <div class="px-8">
      <div class="p-4 mb-8 border-solid border-gray-200 shadow-lg rounded-lg text-center">
        <q-icon class="block mx-auto" :name="store.userInfo.isVaccinated ? 'fas fa-check' : 'fas fa-times'" size="96px"/>
        <p class="m-0 font-bold">{{store.userInfo.isVaccinated ? 'You are vaccinated' : 'You are not vaccinated'}}</p>
        <p class="text-xs"><i>Please check the vaccine status tab for more details.</i></p>
      </div>
      <button-card icon="fas fa-user" title="Personal Information"/>
      <button-card @click="$router.push('/vaccine')" icon="fas fa-syringe" title="Vaccine Status"/>
      <button-card @click="$router.push('/view-log')" icon="fas fa-pen-fancy" title="Create A Log"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { store } from '../api/store'
import Vue from 'vue'

import ButtonCard from '../components/ButtonCard.vue'

export default Vue.extend({
  name: 'Profile',
  components: { ButtonCard },
  data () {
    return {
      store
    }
  }
})
</script>
