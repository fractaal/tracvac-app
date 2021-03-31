<template>
  <div v-ripple @click="emitClick" class="border border-solid border-gray-200 mb-5 flex items-center content-center justify-between relative p-4 rounded-lg">
    <div class=" flex items-center">
      <q-icon :name="icon" class="mr-2 text-blue-500" size="md"></q-icon>
      <p class="font-bold m-0">{{title}}</p>
    </div>
    <q-icon name="keyboard_arrow_right"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ButtonCard',
  props: {
    title: {
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
