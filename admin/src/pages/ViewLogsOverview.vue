<template>
  <q-page class="p-8">
    <tracvac-header title="LOGS" description="VIEW LOGS SUBMITTED BY USERS" class="mb-4"/>
    <q-table
      class='sticky my-auto mb-20'
      :loading="loading"
      virtual-scroll
      flat
      dense
      :pagination.sync="pagination"
      binary-state-sort
      selection="multiple"
      :selected.sync="selected"
      :columns='columns'
      title="Logs"
      :data="data"
      @request="getData"
    >
      <template v-slot:top>
        <div class="w-full flex flex-nowrap">
          <q-btn class="mr-1" flat outline :color='showOnlyUnread? "green" : "black"' :label='showOnlyUnread? "Showing Only Unread" : "Show Only Unread"' :icon='showOnlyUnread? "fas fa-eye" : "fas fa-eye-slash"' @click='toggleShow(!showOnlyUnread)' />
          <q-btn class="mr-1" flat :disable="selected.length === 0" label="MARK UNREAD" color="red" icon="fas fa-times" @click="mark(false)"/>
          <q-btn class="mr-1" flat :disable="selected.length === 0" label="MARK READ" color="green" icon="fas fa-check" @click="mark(true)"/>
          <q-btn class="mr-1" flat :disable="selected.length !== 1" label="VIEW LOGS" color="secondary" icon="remove_red_eye" @click="viewLogs"/>
          <q-btn class="ml-auto mr-1" unelevated label="EXPORT AS EXCEL"  color="secondary" icon="fas fa-file-export" @click="exportToExcel"/>
          <q-btn unelevated :disable="selected.length === 0" label="ADD TO EDITOR PANEL" color="primary" icon="add" @click="addSelectionToEdit"/>
        </div>
      </template>
      <template v-slot:body-cell-adminHasRead='props'>
        <q-td :props='props' :class='props.row.adminHasRead ? "text-green-500" : "text-red-500"'>
          <q-icon :name='props.row.adminHasRead ? "fas fa-check" : "fas fa-exclamation"' size='md'/>
          {{props.row.adminHasRead ? "Yes" : "No"}}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang='ts'>
import Vue from 'vue'
import store from 'src/api/store';
import TracvacHeader from 'components/TracvacHeader.vue'

const columns = [
  {
    name: 'username',
    label: 'Username',
    field: (row: any) => (row.user.username as string)
  },
  {
    name: 'name',
    label: 'Name',
    field: (row: any) => `${row.user.firstName} ${row.user.middleName} ${row.user.lastName}`
  },
  {
    name: 'adminHasRead',
    label: 'Read?',
    field: 'adminHasRead',
    format: (val: boolean) => `${val ? '✅ Yes' : '❌ No'}`
  },
  {
    name: 'fever',
    label: 'Fever?',
    field: 'fever',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'abdominalPain',
    label: 'Abdominal Pain?',
    field: 'abdominalPain',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'chills',
    label: 'Chills?',
    field: 'chills',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'cough',
    label: 'Cough?',
    field: 'cough',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'diarrhea',
    label: 'Diarrhea?',
    field: 'diarrhea',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'difficultyBreathing',
    label: 'Difficulty Breathing?',
    field: 'difficultyBreathing',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'headache',
    label: 'Headache?',
    field: 'headache',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'soreThroat',
    label: 'Sore Throat?',
    field: 'soreThroat',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'nauseaOrVomiting',
    label: 'Nausea or Vomiting?',
    field: 'nauseaOrVomiting',
    format: (val: boolean) => `${val ? '⚠ Yes' : '✅ No'}`
  },
  {
    name: 'others',
    label: 'Others?',
    field: 'others',
  },

]

export default Vue.extend({
  name: 'ViewLogsOverview',
  components: { TracvacHeader },
  activated() {
    this.getData({pagination: this.pagination})
  },
  data() {
    return {
      showOnlyUnread: false,
      selected: [] as Record<string,any>[],
      store,
      data: [],
      loading: false,
      columns,
      pagination: {
        page: 0,
        rowsPerPage: 50,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false,
      },
    }
  },
  methods: {
    async getData(props: Record<string,any>) {
      this.store.unreadLogsCount = (await store.axios.post('/admin/getUnreadLogsCount')).data.count
      this.pagination = Object.assign({}, props.pagination);
      this.loading = true;
      const response = await store.axios.post('/admin/getLogs', {
        page: this.pagination.page-1,
        pageSize: this.pagination.rowsPerPage,
        showOnlyUnread: this.showOnlyUnread,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.data = response.data.data.results
      this.pagination.rowsNumber = response.data.data.total;
      this.loading = false;
    },
    viewLogs () {
      this.$router.push(`/view-logs/${this.selected[0].user.id}`);
    },
    addSelectionToEdit() {
      itemLoop: for (const _ of this.selected) {
        const item = _.user
        for (const existingItem of store.usersToModify) {
          if (item.id === existingItem.id) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            this.$q.notify({message: `${item.username} is already in the edit panel.`, type: 'info'});
            continue itemLoop;
          }
        }
        store.usersToModify.push(Object.assign({}, item));
      }
      this.selected = [];
    },
    toggleShow(value: boolean) {
      this.showOnlyUnread = value;
      this.getData({pagination: this.pagination});
    },
    async mark(value: boolean) {
      try {
        const ids: number[] = []
        for (const log of this.selected) {
          ids.push(log.id)
        }
        await this.$axios.post('/admin/markLogs', {data: ids, read: value});
        this.selected = [];
      } catch(err) {
        this.$q.notify({message: err, type: 'negative'});
        return;
      }
      await this.getData({pagination: this.pagination});
    },
    exportToExcel() {
      this.$q.dialog({
        title: 'Export user data to an excel file?',
        message: 'You will be exporting all user data.',
        cancel: true,
      }).onOk(async () => {
        try {
          const response = await this.$axios({
            url: '/admin/export-logs',
            method: 'GET',
            responseType: 'blob'
          });

          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'export.xlsx');
          document.body.appendChild(link)
          link.click()

        } catch(err) {
          this.$q.notify({
            message: `Export failed! ${err.message}`,
            type: 'negative',
          })
        }
      })
    }
  }
});
</script>

<style scoped>

</style>
