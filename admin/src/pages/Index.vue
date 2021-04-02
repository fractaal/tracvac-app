<template>
  <q-page class="px-8 py-8">
    <h4 class="m-0 font-light">PEOPLE</h4>
    <q-tabs
      class="border-0 border-b border-solid border-gray-300"
      v-model="activeTab"
    >
      <q-tab name="select" class="px-24" icon="add" label="Select" @click='getData({pagination: userPagination, filter: searchFilter})'/>
      <q-tab name="edit" class="px-24" icon="create" label="Edit"/>
    </q-tabs>
    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel name="select">
        <h6 class="m-0 font-light">SELECT ACCOUNTS TO EDIT</h6>
        <br>
        <q-table
          class='sticky'
          :loading="loading"
          virtual-scroll
          table-style="max-height: 550px;"
          flat
          :columns="userColumns"
          :filter="searchFilter"
          :pagination.sync="userPagination"
          binary-state-sort
          selection="multiple"
          :selected.sync="selected"
          title="Users"
          :data="data"
          @request="getData"
        >
          <template v-slot:top>
            <div class='flex flex-row justify-between w-full'>
              <q-input outlined debounce="300" v-model="searchFilter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <div>
                <q-btn
                  outline class='ml-2'
                  :label='showPUMs ? "Showing Under Monitoring" : "Show Under Monitoring"'
                  :icon='showPUMs ? "fas fa-eye" : "fas fa-eye-slash"'
                  @click='toggleShow("PUMs", !showPUMs)'
                />
                <br>
                <q-btn
                  outline class='ml-2 mt-2'
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
        <h6 class="m-0 font-light">EDIT VACCINATION STATUSES</h6>
        <edit-vaccination-status/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import store from 'src/api/store';
import Vue from 'vue';
import EditVaccinationStatus from 'components/EditVaccinationStatus.vue'

export default Vue.extend({
  name: 'Index',
  components: { EditVaccinationStatus },
  async activated() {
    this.loading = true;
    await this.getData({
      pagination: this.userPagination,
      filter: undefined,
    });
    this.loading = false;
  },
  methods: {
    async getData(props: Record<string,any>) {
      this.userPagination = Object.assign({}, props.pagination);
      this.loading = true;
      const response = await store.axios.post('/admin/getUsers', {
        page: this.userPagination.page-1,
        pageSize: this.userPagination.rowsPerPage,
        filter: this.searchFilter,
        showPUIs: this.showPUIs,
        showPUMs: this.showPUMs
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.data = response.data.results
      this.userPagination.rowsNumber = response.data.total;
      this.loading = false;
    },
    toggleShow(puiOrPum: string, value: boolean) {
      if (puiOrPum === 'PUMs') {
        this.showPUMs = value;
      } else if (puiOrPum === 'PUIs') {
        this.showPUIs = value;
      }
      this.getData({pagination: this.userPagination, filter: this.searchFilter, showPUIs: this.showPUIs, showPUMs: this.showPUMs});
    },
    addSelectionToEdit() {
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
    async viewLogs() {
      store.userShownInLogs = Object.assign({}, this.selected[0]);
      await this.$router.push(`/view-logs`);
    },
    async exportToExcel() {
      this.$q.dialog({
        title: "Export user data to an excel file?",
        message: `You will be exporting a total of ${this.userPagination.rowsNumber} user's data.`,
        cancel: true,
      }).onOk(async () => {
        try {
          const response = await this.$axios.get('/admin/export');

          if (response.data.result) {
            this.$q.notify({
              message: 'Export successful! Export file located on the Desktop.',
              type: 'positive',
            })
          } else {
            this.$q.notify({
              message: 'Export failed! Check server console for details.',
              type: 'negative',
            })
          }
        } catch(err) {
          this.$q.notify({
            message: 'Export failed! ' + err,
            type: 'negative',
          })
        }
      })
    }
  },
  data() {
    return {
      selected: [] as Record<string,any>[],
      store,
      searchFilter: '',
      data: [],
      showPUIs: false,
      showPUMs: false,
      totalRows: 0,
      activeTab: 'select',
      loading: false,
      userPagination: {
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      userColumns: [
        {
          name: 'username',
          required: true,
          label: 'Username',
          field: 'username',
          align: 'left'
        },
        {
          name: 'firstName',
          required: true,
          label: 'First Name',
          field: 'firstName',
        },
        {
          name: 'middleName',
          required: true,
          label: 'Middle Name',
          field: 'middleName',
        },
        {
          name: 'lastName',
          required: true,
          label: 'Last Name',
          field: 'lastName',
        },
        {
          name: 'isPUM',
          required: true,
          label: 'Is Under Monitoring',
          format: (val: number) => `${!!val ? '✔ Yes' : '❌ No'}`,
          field: 'isPUM',
        },
        {
          name: 'isPUI',
          required: true,
          label: 'Is Under Investigation',
          format: (val: number) => `${!!val ? '✔ Yes' : '❌ No'}`,
          field: 'isPUI',
        },
        {
          name: 'isVaccinated',
          required: true,
          label: 'Is Vaccinated',
          format: (val: number) => `${!!val ? '✔ Yes' : '❌ No'}`,
          field: 'isVaccinated',
        },
        {
          name: 'isVaccineReady',
          required: true,
          label: 'Vaccine Readiness',
          field: 'isVaccineReady',
        },
        {
          name: 'vaccineManufacturer',
          required: true,
          label: 'Vaccine Manufacturer',
          field: 'vaccineManufacturer',
        },
      ]
    }
  }
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
