<template>
  <q-page>
    <custom-header title="Logs"/>
    <div class="px-8">
      <button-card title="Create A Log" @click="$router.push('/view-log')" icon="fas fa-pen-fancy"/>
      <transition name="transition" mode="out-in">
        <empty-placeholder
          v-if="!isLoading && store.logs.length === 0"
          icon="fas fa-question"
          title="No logs found"
          subtitle='You can create one by pressing the "Create a Log" button.'/>
      </transition>
      <div>
        <load-more @load="onLoad" ref="list">
          <transition-group name="transition" mode="out-in">
            <log-card v-for="log in store.logs" :log="log" :key="log.createdAt"/>
          </transition-group>
        </load-more>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { getLogs, resetLogs } from 'src/api/logs'
import { store } from 'src/api/store'
import ButtonCard from 'components/ButtonCard.vue'
import LogCard from 'components/LogCard.vue'
import CustomHeader from 'components/CustomHeader.vue'
import LoadMore from 'components/LoadMore.vue'
import EmptyPlaceholder from 'components/EmptyPlaceholder.vue'

export default (Vue as VueConstructor<Vue & { $refs: {list: InstanceType<typeof LoadMore>}}>).extend({
  name: 'Logs',
  components: { EmptyPlaceholder, ButtonCard, LogCard, CustomHeader, LoadMore },
  data () {
    return {
      store,
      isLoading: false
    }
  },
  activated () {
    resetLogs()
    this.$refs.list.reset()
    this.$refs.list.load()
  },
  methods: {
    async onLoad (index: number, done: Function) {
      this.isLoading = true
      const [success, isEnd] = await getLogs(index)
      done(isEnd)
      this.isLoading = false
    }
  }
})
</script>
