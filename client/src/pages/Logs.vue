<template>
  <q-page class="px-8">
    <h5 class="font-bold m-0 my-8 p-0">Logs</h5>
    <button-card title="Create A Log" @click="$router.push('/view-log')" icon="fas fa-pen-fancy"/>
    <div v-if="!isLoading && store.logs.length === 0" class="p-8 mt-32 text-gray-500 text-center">
      <q-icon class="block mx-auto" name="fas fa-question" size="96px"/>
      <p class="m-0 font-bold">No logs found</p>
      <p class="text-xs"><i>You can create one by pressing the "Create a Log" button.</i></p>
    </div>
    <div v-else-if="!isLoading && store.logs.length !== 0">
      <log-card v-for="log in store.logs" :log="log" :key="log.createdAt"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { getLogs } from '../api/logs'
import { store } from '../api/store'
import ButtonCard from '../components/ButtonCard.vue'
import LogCard from '../components/LogCard.vue'

export default Vue.extend({
  name: 'Logs',
  components: { ButtonCard, LogCard },
  data () {
    return {
      store,
      isLoading: false
    }
  },
  async activated () {
    this.isLoading = true
    await getLogs()
    this.isLoading = false
  }
})
</script>
