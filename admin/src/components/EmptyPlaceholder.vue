<template>
  <div class='block m-auto w-80 flex items-center justify-center text-gray-500'>
    <div v-if='loading'>
      <q-spinner size='128px' class='block mx-auto'/>
    </div>
    <div v-else>
      <q-icon :name='icon' size='128px' class='block mx-auto'/>
      <div class='text-center text-h6'>{{title}}</div>
      <div class='text-center text-subtitle2'>{{subtitle}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'EmptyPlaceholder',
  props: {
    loading: {
      type: Boolean
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  }
})
</script>

<style scoped>

</style>
