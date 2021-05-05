<template>
  <div
    class="rounded-lg p-3 border border-solid border-gray-200 mb-4"
  >
    <p class="text-h6 m-0 font-bold">{{notification.title}}</p>
    <p class="m-0"><i>{{formattedDate}}</i></p>
    <hr>
    <p class="m-0" v-html="sanitizeHtml(notification.content)"></p>
  </div>
</template>

<script lang="ts">
import { Notification } from 'src/api/notification'
import Vue from 'vue'
import { format, formatDistance } from 'date-fns'
import sanitizeHtml from 'sanitize-html'

export default Vue.extend({
  name: 'NotificationCard',
  data () {
    return {
      formattedDate: `
      Posted ${formatDistance(Date.parse(this.notification.createdAt), Date.now(), { addSuffix: true })}
      on ${format(Date.parse(this.notification.createdAt), 'MMMM d, yyyy')}
      `
    }
  },
  props: {
    notification: {
      type: Object as () => Notification,
      required: true
    }
  },
  methods: { sanitizeHtml }
})
</script>

<style scoped>

</style>
