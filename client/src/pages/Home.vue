<template>
  <q-page class="px-8">
    <div class="flex flex-row justify-between pt-8 items-center">
      <h5 class="font-bold m-0 p-0">Hello, {{store.userInfo.firstName}}!</h5>
      <img class="rounded-full w-10 h-10 shadow-md" src="https://scontent.fcgm1-1.fna.fbcdn.net/v/t1.0-9/108012281_4159685177435556_4897495128471841120_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeGiNrSFbi267lwk7qel8tU1aibkznHdiKBqJuTOcd2IoBXIrAQEUKqTx5GPHA2SuWxIQ4uO6-mI9yHZc0TLKHsz&_nc_ohc=N2zl5l7lIEwAX_42vDl&_nc_ht=scontent.fcgm1-1.fna&oh=ec05ca8bbea95273501bf746b7bc4576&oe=60783494" alt="">
    </div>
    <p class="font-bold mt-8 mb-2 p-0 text-gray-500">RECENTLY VIEWED</p>
    <button-card title="Notifications from DOH" icon="health_and_safety"/>
    <p class="font-bold mt-8 mb-2 p-0 text-gray-500">BE INFORMED!</p>
    <button-card title="Notifications from DOH" icon="health_and_safety"/>
    <button-card title="Notifications from your LGU" icon="fas fa-university"/>
    <button-card title="Post-vaccine updates" icon="fas fa-syringe"/>
    <p class="font-bold mt-8 mb-2 p-0 text-gray-500">OTHERS</p>
    <button-card title="Frequently Asked Questions" icon="fas fa-question"/>
    <button-card title="Preferences" icon="fas fa-cog"/>
    <button-card @click="logout" title="Log Out" icon="fas fa-sign-out-alt"/>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '../api/user'
import { logout } from '../api/auth'
import { store } from '../api/store'

import ButtonCard from '../components/ButtonCard.vue'

export default Vue.extend({
  name: 'Home',
  components: { ButtonCard },
  async mounted () {
    await getUserInfo()
  },
  data () {
    return {
      store
    }
  },
  methods: { logout }
})
</script>
