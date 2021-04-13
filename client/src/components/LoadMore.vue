<template>
  <div>
    <slot>

    </slot>
    <transition name="transition" mode="out-in">
      <div v-if="!isEnd">
        <q-btn label="Load More" @click="load" :loading="isLoading" flat class="block px-4 py-2 my-auto mx-auto"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadMore',
  data () {
    return {
      index: 0,
      isLoading: false,
      isEnd: false
    }
  },
  methods: {
    reset () {
      this.index = 0
      this.isLoading = false
      this.isEnd = false
    },
    load () {
      this.isLoading = true
      this.$emit('load', this.index, (isEnd: boolean) => {
        this.index++
        this.isLoading = false
        this.isEnd = isEnd
      })
    }
  }
})
</script>

<style scoped>

</style>
