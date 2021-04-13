<template>
  <div
    class="rounded-lg p-3 border border-solid border-gray-200 mb-4"
  >
    <p class="text-h6 m-0 font-bold">{{notification.title}}</p>
    <p class="m-0"><i>{{formattedDate}}</i></p>
    <hr>
    <p class="m-0" v-html="notification.content"></p>
  </div>
</template>

<script lang="ts">
import { format, formatDistance } from 'date-fns'

export default {
  name: 'NotificationCard.vue',
  props: {
    notification: {
      type: Object as () => Notification
    }
  },
  data () {
    return {
      formattedDate: `
      Posted ${formatDistance(Date.parse(this.notification.createdAt as string), Date.now(), { addSuffix: true })}
      on ${format(Date.parse(this.notification.createdAt as string), 'MMMM d, yyyy')}
      `
    }
  }
}
</script>

<style scoped>

</style>
