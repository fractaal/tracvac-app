<template>
  <div>
    <custom-header title="Change Profile Picture"/>
    <div class="px-8">
      <p class="font-bold p-0 text-gray-500">SELECT A PICTURE</p>
      <q-file filled v-model="file" label="Some picture..."/>
      <br>
      <q-img :src="url"/>
      <br>
      <p class="font-bold p-0 text-gray-500 text-center text-sm mt-2" v-if="file"><i>FOR BEST RESULTS, UPLOAD A SQUARE IMAGE.</i></p>
      <q-btn :loading="loading" v-if="file" unelevated color="primary" class="p-2 block mx-auto" @click="uploadProfilePicture">UPLOAD</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CustomHeader from 'components/CustomHeader.vue'
import { uploadProfilePicture } from 'src/api/user'

export default Vue.extend({
  components: { CustomHeader },
  name: 'ChangeProfilePicture',
  activated () {
    this.file = null as unknown as File
  },
  data () {
    return {
      loading: false,
      file: null as unknown as File
    }
  },
  computed: {
    url (): string {
      try {
        console.log(this.file)
        return URL.createObjectURL(this.file)
      } catch (e) {
        return ''
      }
    }
  },
  methods: {
    async uploadProfilePicture () {
      this.loading = true
      const response = await uploadProfilePicture(this.file)
      this.loading = false
      if (response) {
        this.$router.back()
      }
    }
  }
})
</script>

<style scoped>

</style>
