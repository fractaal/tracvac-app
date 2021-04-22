<template>
  <q-page class="px-8 py-8">
    <h4 class="m-0 font-light">PEOPLE</h4>
    <q-tabs
      class="border-0 border-b border-solid border-gray-300"
      v-model="activeTab"
    >
      <q-tab name="select" class="px-24" icon="add" label="Select" @click='getData({pagination: pagination, filter: searchFilter})'/>
      <q-tab name="edit" class="px-24" icon="create" label="Edit"/>
    </q-tabs>
    <q-tab-panels v-model="activeTab" animated keep-alive>
      <q-tab-panel name="select">
        <h6 class="m-0 font-light">SELECT ACCOUNTS TO EDIT</h6>
        <br>
        <q-table
          class='sticky'
          :loading="loading"
          virtual-scroll
          table-style="max-height: 500px;"
          flat
          :columns="columns"
          :visible-columns='visibleColumns'
          :filter="searchFilter"
          :pagination.sync="pagination"
          binary-state-sort
          selection="multiple"
          :selected.sync="selected"
          title="Users"
          :data="data"
          @request="getData"
        >
          <template v-slot:top>
            <div class='flex flex-row items-center content-center'>
              <q-btn
                outline class='mx-2'
                label='Select amount of people...'
                icon='fas fa-plus'
                @click='selectAmountOfPeople'
              />
              <q-input
                dense
                outlined
                debounce="300"
                v-model="searchFilter"
                placeholder="Search names"
                style='min-width: 400px'
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-select
                class='mx-4'
                v-model="visibleColumns"
                multiple
                outlined
                dense
                options-dense
                display-value='Show/hide columns'
                emit-value
                map-options
                :options="columns"
                option-value="name"
                options-cover
                style="min-width: 150px"
              />
              <div>
                <q-btn
                  outline class='mx-2'
                  :color='showPUMs ? "green" : "black"'
                  :label='showPUMs ? "Showing Under Monitoring" : "Show Under Monitoring"'
                  :icon='showPUMs ? "fas fa-eye" : "fas fa-eye-slash"'
                  @click='toggleShow("PUMs", !showPUMs)'
                />
                <q-btn
                  outline class='mx-2'
                  :color='showPUIs ? "green" : "black"'
                  :label='showPUIs ? "Showing Under Investigation" : "Show Under Investigation"'
                  :icon='showPUIs ? "fas fa-eye" : "fas fa-eye-slash"'
                  @click='toggleShow("PUIs", !showPUIs)'
                />
              </div>
            </div>
          </template>
        </q-table>
        <q-page-sticky :offset='[20, 20]' position="bottom-right">
          <q-btn
            class="p-2 mx-2"
            label=" EXPORT AS EXCEL"
            color="secondary"
            icon="fas fa-file-export"
            @click="exportToExcel"
            fab
          />
          <q-btn
            class="p-2 mx-2"
            :disable="selected.length !== 1"
            label=" VIEW LOGS"
            color="secondary"
            icon="remove_red_eye"
            @click="viewLogs"
            fab
          />
          <q-btn
            class="p-2 mx-2"
            :disable="selected.length === 0"
            label="ADD TO EDITOR PANEL"
            color="primary"
            icon="add"
            @click="addSelectionToEdit"
            fab
            />
        </q-page-sticky>
      </q-tab-panel>
      <q-tab-panel name="edit">
        <edit-vaccination-status ref='edit'/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import store from 'src/api/store';
import peopleColumns from 'src/people-columns';
import Vue from 'vue';
import EditVaccinationStatus from 'components/EditVaccinationStatus.vue'

export default Vue.extend({
  name: 'Index',
  components: { EditVaccinationStatus },
  async activated() {
    this.loading = true;
    await this.getData({
      pagination: this.pagination,
      filter: undefined,
    });
    this.loading = false;
  },
  data() {
    return {
      selected: [] as Record<string,any>[],
      store,
      searchFilter: '',
      data: [],
      showPUIs: false,
      showPUMs: false,
      activeTab: 'select',
      loading: false,
      pagination: {
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false,
      },
      columns: peopleColumns,
      visibleColumns: ['username', 'firstName', 'middleName', 'lastName'],
    }
  },
  methods: {
    async getData(props: Record<string,any>) {
      this.pagination = Object.assign({}, props.pagination);
      this.loading = true;
      const response = await store.axios.post('/admin/getUsers', {
        page: this.pagination.page-1,
        pageSize: this.pagination.rowsPerPage === 0 ? this.pagination.rowsNumber : this.pagination.rowsPerPage,
        filter: this.searchFilter,
        showPUIs: this.showPUIs,
        showPUMs: this.showPUMs,
        orderBy: this.pagination.sortBy,
        ascending: !this.pagination.descending,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.data = response.data.results
      this.pagination.rowsNumber = response.data.total;
      this.loading = false;
    },
    toggleShow(puiOrPum: string, value: boolean) {
      if (puiOrPum === 'PUMs') {
        this.showPUMs = value;
      } else if (puiOrPum === 'PUIs') {
        this.showPUIs = value;
      }
      this.getData({pagination: this.pagination, filter: this.searchFilter, showPUIs: this.showPUIs, showPUMs: this.showPUMs});
    },
    addSelectionToEdit() {
      console.log(this.selected);
      itemLoop: for (const item of this.selected) {
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
    selectAmountOfPeople() {
      this.$q.dialog({message: 'Input amount of people to select', prompt: {model: '', type: 'number'}}).onOk(async (amount: number) => {
        if (amount > this.pagination.rowsNumber) {
          this.$q.notify({message: 'Amount selected is more than amount currently loaded.', type: 'warn'});
        }
        const response = await this.store.axios.post('/admin/selectAmountOfPeople', {limit: amount})
        if (response.data.result) {
          this.selected = response.data.data;
        } else {
          this.$q.notify({message: `Could not get amount of people - ${response.data.message}`, type: 'negative'})
        }

        this.addSelectionToEdit();
      })
    },
    async viewLogs() {
      await this.$router.push(`/view-logs/${this.selected[0].id}`);
    },
    exportToExcel() {
      this.$q.dialog({
        title: 'Export user data to an excel file?',
        message: 'You will be exporting all user data.',
        cancel: true,
      }).onOk(async () => {
        try {
          const response = await this.$axios({
            url: '/admin/export',
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
  },
});
</script>

<style lang="sass">
.sticky
  /* height or max-height is important */
  height: 700px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
