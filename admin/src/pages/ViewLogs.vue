<template>
  <q-page class='p-8'>
    <h4 class='m-0 font-light'>LOGS</h4>
    <p>For {{store.userShownInLogs.firstName}} {{store.userShownInLogs.middleName}} {{store.userShownInLogs.lastName}}</p>
    <hr>
    <div v-if='logs.length !== 0'>
      <div class='grid grid-cols-2 gap-4'>
        <q-card class='mb-2 shadow-3' v-for='log in logs' :key='log.createdAt'>
          <q-card-section>
            <div class='font-bold'>
              Created {{formatDateAndTime(log.createdAt).formatted}}
              <br>
              {{formatDateAndTime(log.createdAt).formattedDistance}}
            </div>
            <div class='grid grid-cols-2' v-for='(displayName, name) in displayNameMappings' :key='name'>
              <p class='p-0 m-0' >
                {{displayName}}
              </p>
              <div v-if='!log[name]' class='text-green-500'>
                <q-icon name='fas fa-check-circle'/>
                No
              </div>
              <div v-else class='text-red-500'>
                <q-icon name='fas fa-exclamation-triangle'/>
                Yes
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else>
      <p class='text-gray-500'>No logs found for this user.</p>
    </div>
  </q-page>
</template>

<script lang='ts'>
import { format, formatDistanceToNow } from 'date-fns';
import store from 'src/api/store';
import Vue from 'vue'

const displayNameMappings = {
  fever: 'Fever',
  abdominalPain: 'Abdominal Pain',
  chills: 'Chills',
  cough: 'Cough',
  diarrhea: 'Diarrhea',
  difficultyBreathing: 'Difficulty Breathing',
  headache: 'Headache',
  soreThroat: 'Sore Throat',
  nauseaOrVomiting: 'Nausea or Vomiting'
} as const

export default Vue.extend({
  name: "ViewLogs",
  activated() {
    if (store.userShownInLogs === null) {
      this.$router.back();
    }
    this.logs = [];
    this.getLogs();
  },
  data() {
    return {
      store,
      logs: [],
      displayNameMappings,
    }
  },
  methods: {
    formatDateAndTime(dateString: string) {
      const date = new Date(dateString);
      return {
        formatted: format(date, "MMMM dd, yyyy - hh:mmaaa"),
        formattedDistance: formatDistanceToNow(date, {addSuffix: true})
      }
    },
    async getLogs() {
      try {
        const response = await this.$axios.post('/admin/viewLogs', {userId: store.userShownInLogs.id});
        if (response.data.result) {
          this.logs = response.data.data;
        } else {
          this.$q.notify({
            message: `Getting logs failed: ${response.data.message}`,
            type: 'negative',
          })
        }
      } catch(err) {
        this.$q.notify({
          message: `Getting logs failed: ${err}`,
          type: 'negative',
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
