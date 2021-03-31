<template>
  <q-page>
    <custom-header title="Logs"/>
    <div class="px-8">
      <button-card title="Create A Log" @click="$router.push('/view-log')" icon="fas fa-pen-fancy"/>
      <div v-if="!isLoading && store.logs.length === 0" class="p-8 mt-32 text-gray-500 text-center">
        <q-icon class="block mx-auto" name="fas fa-question" size="96px"/>
        <p class="m-0 font-bold">No logs found</p>
        <p class="text-xs"><i>You can create one by pressing the "Create a Log" button.</i></p>
      </div>
      <div v-else-if="!isLoading && store.logs.length !== 0">
        <log-card v-for="log in store.logs" :log="log" :key="log.createdAt"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { getLogs } from 'src/api/logs'
import { store } from 'src/api/store'
import ButtonCard from 'components/ButtonCard.vue'
import LogCard from 'components/LogCard.vue'
import CustomHeader from 'components/CustomHeader.vue'

export default Vue.extend({
  name: 'Logs',
  components: { ButtonCard, LogCard, CustomHeader },
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
