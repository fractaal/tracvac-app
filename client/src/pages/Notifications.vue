<template>
  <q-page>
    <custom-header title="Notifications"/>
    <div class="px-8">
      <transition name="transition" mode="out-in">
        <empty-placeholder
          v-if="!isLoading && notifications.length === 0"
          icon="fas fa-question"
          title="No notifications found"
          subtitle='LGU Notifications are shown here.'
        />
      </transition>
      <load-more ref="list" @load="onLoad">
        <transition-group name="transition" mode="out-in">
          <notification-card
            v-for="notification in notifications"
            :notification="notification"
            :key="notification.id"
          />
        </transition-group>
      </load-more>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { getNotifications, Notification } from 'src/api/notification'
import { store } from 'src/api/store'
import CustomHeader from 'components/CustomHeader.vue'
import LoadMore from 'components/LoadMore.vue'
import EmptyPlaceholder from 'components/EmptyPlaceholder.vue'
import NotificationCard from 'components/NotificationCard.vue'

export default (Vue as VueConstructor<Vue & { $refs: {list: InstanceType<typeof LoadMore>}}>).extend({
  name: 'Notifications',
  components: { NotificationCard, CustomHeader, LoadMore, EmptyPlaceholder },
  data () {
    return {
      isLoading: false,
      store,
      notifications: [] as Notification[]
    }
  },
  activated () {
    this.notifications = []
    this.$refs.list.reset()
    this.$refs.list.load()
  },
  methods: {
    async onLoad (index: number, done: Function) {
      this.isLoading = true
      const [notifs, isEnd] = await getNotifications(index)
      if (notifs !== null) {
        this.notifications.push(...notifs)
      }
      done(isEnd)
      this.isLoading = false
    }
  }
})
</script>

<style scoped>

</style>
