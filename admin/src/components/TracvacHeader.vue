<template>
  <div>
    <p class="-my-2">TRACVAC</p>
    <h4 class="m-0 font-light">{{title}}</h4>
    <p class="-my-2">{{description}}</p>
  </div>
</template>

<script>
export default {
  name: 'TracvacHeader',
  props: ['title', 'description']
}
</script>

<style>

</style>