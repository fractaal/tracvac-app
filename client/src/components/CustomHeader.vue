<template>
  <div class="m-0 py-4 px-4">
    <q-btn class="inline mr-4 p-0" flat round icon="keyboard_arrow_left" @click="goBack"></q-btn>
    <h5 class="align-middle inline font-bold">{{title}}</h5>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BlueHeader',
  props: {
    title: {
      type: String
    }
  },
  methods: {
    async goBack () {
      await new Promise(resolve => setTimeout(resolve, 150))
      this.$router.back()
    }
  }
})
</script>

<style scoped>

</style>
