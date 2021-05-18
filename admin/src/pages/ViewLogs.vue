<template>
  <q-page class='p-8'>
    <h4 class='m-0 font-light'>LOGS</h4>
    <p v-if='activeUser'>For {{activeUser.firstName}} {{activeUser.middleName}} {{activeUser.lastName}}</p>
    <q-spinner v-else/>
    <hr class='mb-4'>
    <div class='grid grid-cols-2 gap-4'>
      <div>
        <div v-if='logs.length !== 0'>
          <div>
            <q-card class='mb-2 rounded-2xl shadow-xl border-3 border-gray-300 border-solid' v-for='log in logs' :key='log.createdAt'>
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
                <br/>
                <div class="font-bold bg-gray-100 p-4 rounded-xl">
                  <p class="text-lg p-0 m-0" :class="log.others ? 'text-black' : 'text-gray-400'">Other: 
                    <span class="font-bold" v-if="log.others">{{log.others}}</span>
                    <span class="font-bold font-italic" v-else>NONE</span>
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div v-else>
          <empty-placeholder :loading='loadingLogs' title='No logs found for this user' icon='fas fa-times' subtitle="They just didn't submit anything yet."/>
        </div>
      </div>
      <user-info-card v-if='activeUser' :user='activeUser'/>
      <q-spinner v-else/>
    </div>
  </q-page>
</template>

<script lang='ts'>
import UserInfoCard from 'components/UserInfoCard.vue';
import EmptyPlaceholder from 'components/EmptyPlaceholder.vue';
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
  name: 'ViewLogs',
  components: { EmptyPlaceholder, UserInfoCard },
  activated() {
    this.activeUser = null;
    this.logs = [];
    this.getLogs();
  },
  data() {
    return {
      activeUser: null,
      loadingLogs: false,
      store,
      logs: [],
      displayNameMappings,
    }
  },
  methods: {
    formatDateAndTime(dateString: string) {
      const date = new Date(dateString);
      return {
        formatted: format(date, 'MMMM dd, yyyy - hh:mmaaa'),
        formattedDistance: formatDistanceToNow(date, {addSuffix: true})
      }
    },
    async getLogs() {
      this.loadingLogs = true
      try {
        const response1 = await this.$axios.get(`/admin/getUser/${this.$route.params.id}`);
        if (response1.data.result) {
          this.activeUser = Object.assign({}, this.activeUser, response1.data.data)
          const response2 = await this.$axios.post('/admin/viewLogs', {userId: this.$route.params.id});
          if (response2.data.result) {
            this.logs = response2.data.data;
          } else {
            this.$q.notify({
              message: `Getting logs failed: ${response2.data.message}`,
              type: 'negative',
            })
          }
        } else {
          this.$q.notify({
            message: `Getting logs failed: ${response1.data.message}`,
            type: 'negative',
          })
        }
      } catch(err) {
        this.$q.notify({
          message: `Getting logs failed: ${err}`,
          type: 'negative',
        })
      }
      this.loadingLogs = false;
    }
  }
})
</script>

<style scoped>

</style>
