<template>
  <div v-ripple @click="emitClick" class="relative border border-solid border-gray-200 p-4 rounded-lg">
    <p class="m-0 font-bold text-h6">{{title}}</p>
    <p class="m-0">{{description}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LargeButtonCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    emitClick () {
      setTimeout(() => { this.$emit('click') }, 150)
    }
  }
})

</script>

<style>

</style>
