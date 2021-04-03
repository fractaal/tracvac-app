<template>
  <q-page>
    <custom-header title="Notifications"/>
    <div class="px-8">
      <q-infinite-scroll :debounce="300" ref="scroll" @load="onLoad" :offset="50">
        <transition-group name="transition" mode="out-in">
          <div
          class="rounded-lg p-4 border border-solid border-gray-200 mb-4"
          v-for="notification in notifications"
          :key="notification.id"
          >

            <p class="text-h4 m-0">{{notification.title}}</p>
            <p class="m-0" v-html="notification.content"></p>
          </div>
        </transition-group>
        <template v-slot:loading>
          <q-spinner-puff
            class="block mx-auto"
            color="primary"
            size="4em"
          />
        </template>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { getNotifications, Notification } from 'src/api/notification'
import { store } from 'src/api/store'
import CustomHeader from 'components/CustomHeader.vue'

export default Vue.extend({
  name: 'Notifications',
  components: { CustomHeader },
  activated () {
    this.notifications = []
    // @ts-ignore
    this.$refs.scroll.reset()
    // @ts-ignore
    this.$refs.scroll.resume()
    // @ts-ignore
    this.$refs.scroll.trigger()
  },
  data () {
    return {
      store,
      notifications: [] as Notification[],
      lastIndex: -1
    }
  },
  methods: {
    async onLoad (index: number, done: Function) {
      if (this.lastIndex === index) {
        done()
        return
      }
      this.lastIndex = index
      const [notifs, isEnd] = await getNotifications(index - 1)
      if (notifs !== null) {
        this.notifications.push(...notifs)
      }
      done(isEnd)
    }
  }
})
</script>

<style scoped>

</style>
