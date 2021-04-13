<template>
  <div  class="p-8 mt-32 text-gray-500 text-center" key="ph">
    <q-icon class="block mx-auto" :name="icon" size="96px"/>
    <p class="m-0 font-bold">{{title}}</p>
    <p class="text-xs"><i>{{subtitle}}</i></p>
  </div>
</template>

<script>
export default {
  name: 'EmptyPlaceholder',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
