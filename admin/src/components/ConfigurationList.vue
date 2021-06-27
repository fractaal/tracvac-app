<template>
  <q-list class="mx-24">
    <div class="text-h6 mx-4">{{displays[type].title.toUpperCase()}}</div>
    <div class="text-sm mx-4">{{displays[type].description}}</div>
    <q-item v-for="item in items" :key="item[titleKeys[type]]" clickable v-ripple class="rounded-md border-2 border-solid border-gray-200 p-4 my-2">
      <q-item-section>
        <q-item-label class="text-lg font-black">{{item[titleKeys[type]]}}</q-item-label>
        <q-separator class="my-2" />
        <q-item-label v-for="(value, key) in item" :key="key" class="grid grid-cols-2 gap-2">
          <div class="font-black">{{key}}</div>
          <div>{{value}}</div>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-inner-loading :showing="isLoading">
      <q-spinner size="50px" color="black"/>
    </q-inner-loading>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import store from 'src/api/store'

const endpoints = {
  plugins: '/admin/activePlugins',
  dataFields: '/admin/userDataFields',
  registrationFields: '/admin/userRegistrationFields'
}

export default Vue.extend({
  name: 'ConfigurationList',
  data() {
    return {
      isLoading: false,
      store,
      items: [] as Record<string,any>[],
      titleKeys: {
        plugins: 'name',
        dataFields: 'displayName',
        registrationFields: 'displayName'
      },
      displays: {
        plugins: {
          title: 'Active Plugins',
          description: 'These are plugins Tracvac has currently loaded.'
        },
        dataFields: {
          title: 'Extra User Data Fields',
          description: 'These are extra database fields plugins have registered.'
        },
        registrationFields: {
          title: 'Extra User Registration Fields',
          description:
            'These are extra registration fields plugins have registered. They show up in the registration form. Registration fields work in tandem with the data fields.'
        }
      }
    }
  },
  props: {
    type: String as () => 'plugins' | 'dataFields' | 'registrationFields'
  },
  async created() {
    this.isLoading = true
    const { data } = await this.store.axios.get(endpoints[this.type])
    this.isLoading = false
    this.items = data
  }
})
</script>

<style></style>
