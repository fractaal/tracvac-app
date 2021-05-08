<template>
  <div class="p-4 rounded-md shadow-xl border-3 border-solid" :class="style">
      <div class="text-lg font-extrabold mb-2">
        <q-icon :name="icon" size="md" class="mr-2"/>
        {{title}}
       </div>
      <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NotificationCard',
  props: ['title', 'type'],
  computed: {
    icon: function (): string {
      if (this.type === 'info') {
        return 'fas fa-info'
      } else if (this.type === 'warn') {
        return 'fas fa-exclamation-triangle'
      } else if (this.type === 'error') {
        return 'fas fa-times'
      } else {
        return 'fas fa-tag'
      }
    },
    style: function (): string {
      if (this.type === 'info') {
        return 'text-black bg-white border-gray-200'
      } else if (this.type === 'warn') {
        return 'text-black bg-yellow-300 border-yellow-400'
      } else if (this.type === 'error') {
        return 'text-white bg-red-500 border-red-300'
      } else return ''
    }
  }
});
</script>

<style lang="scss" scoped></style>