<template>
  <q-page class="p-8">
    <div class="flex flex-row justify-between items-center">
      <div>
        <p class="-my-2">TRACVAC</p>
        <h4 class="m-0 mb-4 font-light">INSIGHT</h4>
      </div>
      <div>
        <p class="m-0 p-0" v-if="timeUntilPoll !== 0">Updating data in {{timeUntilPoll}} seconds</p>
      </div>
    </div>
    <div class="grid grid-cols-3 grid-rows-3 gap-4 grid-flow-row-dense">
      <notification-card 
        v-for="alert in insightData.alerts" 
        :key="alert.title" 
        :title="alert.title" 
        :type="alert.type">
        <p v-html="alert.message"/>
      </notification-card>  
      <notification-card 
        title="Some users report symptoms after vaccination" 
        type="warn" 
        v-if="insightData.miscItems && insightData.miscItems.logsAfterVaccination.length > 0" 
        class="p-4 rounded-md shadow-xl border-2 border-solid">
        <p><b>{{insightData.miscItems.logsAfterVaccination.length}}</b> user(s) are reporting symptoms<br>
        with a total of {{insightData.miscItems.logsAfterVaccination.reduce((acc, curr) => acc + parseInt(curr.count), 0)}} log(s) reported</p>
        <q-list>
          <q-item v-for="user in insightData.miscItems.logsAfterVaccination" clickable v-ripple :key="user.id" @click="$router.push(`/view-logs/${user.id}`)">
            <q-item-section>
              <q-item-label> {{user.firstName}} {{user.middleName}} {{user.lastName}} </q-item-label>
              <q-item-label caption> {{user.count}} log(s) </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </notification-card>
      <notification-card v-for="(chartItem, title) in insightData.chartItems" :title="title" :key="title" type="info">
        <VueApexChart :series="Object.values(chartItem).map(val => parseInt(val))" :options="{chart: {type: 'pie'}, labels: Object.keys(chartItem)}"/>
      </notification-card>
    </div>
    <q-inner-loading :showing="isLoading" size="128px"/>
    <q-page-sticky :offset='[20, 20]' position="bottom-right">
      <q-btn 
        fab 
        :label="autoUpdate ? ' AUTOUPDATE ENABLED' : ' AUTOUPDATE DISABLED'" 
        :icon="autoUpdate ? 'fas fa-check' : 'fas fa-times'"
        :color="autoUpdate ? 'primary' : 'red'"
        @click="autoUpdate = !autoUpdate"/>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import store from 'src/api/store'
import NotificationCard from 'src/components/NotificationCard.vue'
import VueApexChart from 'vue-apexcharts'

const timeout = 5

export default Vue.extend({
  components: { NotificationCard, VueApexChart },
  name: 'Insight',
  created() {
    void (async () => {
      while (true) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await this.poll()
        for (this.timeUntilPoll = timeout; this.timeUntilPoll >= 0; this.timeUntilPoll--) {
          if (!this.autoUpdate) this.timeUntilPoll++;
          await new Promise(r => setTimeout(r, 1000))
        }
      }
    })();
  },
  data() {
    return {
      timeUntilPoll: 0,
      autoUpdate: false,
      store,
      isLoading: false,
      insightData: {},
    };
  },
  props: {},
  methods: {
    async poll() {
      this.isLoading = true
      this.insightData = Object.assign({}, this.insightData, (await this.store.axios.get('/admin/insight')).data)
      this.isLoading = false
    }
  },
});
</script>

<style lang="scss" scoped></style>