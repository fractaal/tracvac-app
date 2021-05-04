<template>
  <div class="border border-solid border-gray-200 mb-5 p-4 rounded-lg">
    <div class="flex flex-row items-center justify-between">
      <p class="font-bold">{{formattedDate}}</p>
      <p class="m-0 pr-2">{{formattedTime}}</p>
    </div>
    <p class="text-sm"><i>{{previewString}}</i></p>
    <div class="flex flex-row items-center justify-end">
      <q-btn
        icon="delete"
        size="12px"
        color="black"
        flat
        class="py-2"
        :loading="isProcessingDelete"
        @click="deleteLog"
        label="Delete"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns'
import { Log, displayNameMappings, deleteLog } from '../api/logs'
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
      previewString: '',
      isProcessingDelete: false
    }
  },
  created () {
    this.formattedDate = format(Date.parse(this.log.createdAt as string), 'MMMM d, yyyy')
    this.formattedTime = format(Date.parse(this.log.createdAt as string), 'h:mm bbb')

    const symptoms = []

    for (const key in this.log) {
      // @ts-ignore
      if (!!(this.log[key]) && displayNameMappings[key]) {
        // @ts-ignore
        symptoms.push(displayNameMappings[key])
      } else if (key === 'others' && this.log[key]) {
        symptoms.push(this.log[key])
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
  },

  methods: {
    async deleteLog () {
      this.isProcessingDelete = true
      if (await deleteLog(this.log.id)) {
        this.$emit('delete')
      }
      this.isProcessingDelete = false
    }
  }
})
</script>

<style>

</style>
