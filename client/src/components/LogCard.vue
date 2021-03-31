<template>
  <div class="border border-solid border-gray-200 mb-5 p-4 rounded-lg">
    <div class="flex flex-row items-center justify-between">
      <p class="font-bold">{{formattedDate}}</p>
      <p>{{formattedTime}}</p>
    </div>
    <p class="text-sm"><i>{{previewString}}</i></p>
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns'
import { Log, displayNameMappings } from '../api/logs'
import Vue from 'vue'

export default Vue.extend({
  name: 'LogCard',
  props: {
    log: {
      type: Object as () => Log,
      required: true
    }
  },
  data () {
    return {
      formattedDate: '',
      formattedTime: '',
      previewString: ''
    }
  },
  created () {
    this.formattedDate = format(Date.parse(this.log.createdAt as string), 'MMMM d, yyyy')
    this.formattedTime = format(Date.parse(this.log.createdAt as string), 'h:mmbbb')

    const symptoms = []

    for (const key in this.log) {
      if (this.log[key] === true) {
        symptoms.push(displayNameMappings[key])
      }
    }

    symptoms.forEach((value, idx) => {
      if (idx === symptoms.length - 2) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        this.previewString += `${value} and `
      } else if (idx !== symptoms.length - 1) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        this.previewString += `${value}, `
      } else {
        this.previewString += value
      }
    })
  }
})
</script>

<style>

</style>
