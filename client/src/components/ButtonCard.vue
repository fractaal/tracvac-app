<template>
  <div v-ripple="{early: true}" @click="$emit('click')" class="border-solid border-gray-200 mb-5 flex items-center content-center justify-between relative p-4 shadow-lg rounded-lg">
    <div class="flex items-center">
      <q-icon :name="icon" class="mr-2" size="md"></q-icon>
      <p class="font-bold m-0">{{title}}</p>
    </div>
    <q-icon name="keyboard_arrow_right"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SmallHomeCard',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
})

</script>

<style>

</style>
