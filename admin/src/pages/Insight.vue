<template>
  <q-page class="p-8">
    <div class="flex flex-row items-center">
      <div>
        <p class="-my-2">TRACVAC</p>
        <h4 class="m-0 mb-4 font-light">INSIGHT</h4>
      </div>
      <div class="ml-4" v-if="isLoading">
        <p class="m-0">UPDATING...</p>
        <q-linear-progress indeterminate />
      </div>
    </div>
    <!--<div class="grid grid-cols-3 grid-rows-3 gap-4 grid-flow-row-dense">-->
    <div class="insight-columns">
      <notification-card 
        v-for="alert in insightData.alerts" 
        :key="alert.title" 
        :title="alert.title" 
        :type="alert.type">
        <span v-html="alert.message"/>
      </notification-card>  
      <notification-card 
        title="Some users report symptoms after vaccination" 
        type="warn" 
        v-if="insightData.miscItems && insightData.miscItems.logsAfterVaccination.length > 0" 
        class="p-4 rounded-md shadow-xl border-2 border-solid">
        <p><b>{{insightData.miscItems.logsAfterVaccination.length}}</b> user(s) are reporting symptoms<br>
        with a total of {{insightData.miscItems.logsAfterVaccination.reduce((acc, curr) => acc + parseInt(curr.count), 0)}} log(s) reported</p>
        <q-list style="max-height: 250px; overflow-y: scroll;">
          <q-item 
            v-for="user in insightData.miscItems.logsAfterVaccination" 
            class="rounded-xl"
            clickable 
            v-ripple 
            :key="user.id" 
            @click="$router.push(`/view-logs/${user.id}`)">
            <q-item-section>
              <q-item-label> {{user.firstName}} {{user.middleName}} {{user.lastName}} </q-item-label>
              <q-item-label caption> {{user.count}} log(s) </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </notification-card>
    </div>
    <div v-for="(section, sectionTitle) in chartItems" class="mb-4" :title="sectionTitle" :key="sectionTitle" type="info">
      <div class="text-h5 mb-2 font-bold">{{sectionTitle.toUpperCase()}}</div>
      <div class="insight-columns">
        <notification-card v-for="(chartItem, title) in section" :title="title" :key="title" type="info">
          <VueApexChart height="250px" :series="chartItem.series" :options="{chart: {type: chartItem.type, fontFamily: 'Red Hat Display'}, labels: chartItem.labels}"/>
        </notification-card>
      </div>
    </div>
    <q-page-sticky :offset='[20, 20]' position="bottom-right">
      <q-btn
        class="mr-2"
        fab
        :color="autoUpdate ? 'primary' : 'red'"
        :label="autoUpdate ? 'AUTO REFRESH ON' : 'AUTO REFRESH OFF'"
        @click="autoUpdate = !autoUpdate"
        />  
      <q-btn
        fab 
        icon="sync"
        color="green"
        label="REFRESH DATA"
        @click="poll"/>
    </q-page-sticky>
    <q-inner-loading :showing="isLoading && Object.keys(insightData).length === 0" size="128px"/>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import store from 'src/api/store'
import NotificationCard from 'src/components/NotificationCard.vue'
import VueApexChart from 'vue-apexcharts'

export default Vue.extend({
  components: { NotificationCard, VueApexChart },
  name: 'Insight',
  created() {
    void this.poll()
    setInterval(() => {if (this.autoUpdate) void this.poll()}, 10000)
  },
  data() {
    return {
      autoUpdate: false,
      timeUntilPoll: 0,
      store,
      isLoading: false,
      insightData: {} as Record<string,any>,
      chartItems: {} as Record<string,any>
    };
  },
  props: {},
  methods: {
    async poll() {
      this.isLoading = true

      this.insightData = Object.assign({}, this.insightData, (await this.store.axios.get('/admin/insight')).data)

      if (this.insightData?.chartItems) {
        for (const section in this.insightData.chartItems) {
          for (const item in this.insightData.chartItems[section]) {
            if (!(section in this.chartItems)) this.chartItems[section] = {};

            this.chartItems[section][item] = {
              type: 'pie',
              series: Object.values(this.insightData.chartItems[section][item]).map((val) => parseInt(val as string)),
              labels: Object.keys(this.insightData.chartItems[section][item])
            }
          }
        }
      }

      this.isLoading = false
    }
  },
});
</script>

<style lang="scss" scoped></style>