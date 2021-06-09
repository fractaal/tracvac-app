<template>
  <div>
    <div class="overflow-x-visible grid grid-cols-2 gap-6">
      <div>
        <div class='text-h6 mb-8'>EDIT VACCINATION STATUSES</div>
        <div class='flex mx-auto'>
          <q-input dense debounce='500' v-model='searchFilter' label='Search...' class='w-1/2 mr-2'/>
          <q-pagination v-model='pageIndex' :max='Math.ceil(filteredUsers.length/usersPerPage)' input/>
        </div>
        <br/>
        <!-- <transition-group v-if='store.usersToModify.length !== 0' name="transition" mode="out-in"> -->
          <q-card v-for="(user, idx) in paginatedUsers" :class='user.hasDiscrepancy ? "ring-4 ring-red-500" : "ring-4 ring-gray-300"' class="mb-8 rounded-2xl shadow-xl border-3" :key="user.id">
            <q-card-section>
              <div class="flex flex-nowrap justify-between">
                <q-btn class="absolute -mt-8 -ml-8" round color="negative" icon="close" @click="store.usersToModify.splice(idx, 1)"/>
                <div>
                  <div class='flex flex-nowrap'>
                    <q-avatar class='block mb-4 rounded-full ring-4 w-16 h-16 ring-blue-500 shadow-5'>
                      <q-img ratio='1' :src='"http://localhost/" + user.profilePicturePath'/>
                    </q-avatar>
                    <div class='mx-4'>
                      <h6 class="m-0 p-0 font-bold leading-5">{{user.firstName}} {{user.lastName}}</h6>
                      <p class="m-0 p-0">@{{user.username}}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <q-btn outline label='View Logs' @click='$router.push("view-logs/" + user.id)'/>
                </div>
                <!--
                <div>
                  <p :class="user.isVaccinated === true ? 'text-green-500' : 'text-red-700'" class="m-0 p-0 text-right font-extrabold">{{user.isVaccinated === true ? '✅ VACCINATED' : '❌ NOT VACCINATED'}}</p>
                  <p :class="vaccineStatusStyling(user.isVaccineReady)" class="m-0 p-0 text-right font-extrabold">VACCINE IS {{user.isVaccineReady.toUpperCase()}}</p>
                  <hr/>
                  <p class="m-0 p-0 text-right">UNDER INVESTIGATION: <b>{{user.isPUI ? 'Yes' : 'No'}}</b></p>
                  <p class="m-0 p-0 text-right">UNDER MONITORING: <b>{{user.isPUM ? 'Yes' : 'No'}}</b></p>
                </div>
                -->
              </div>
              <br>
              <div>
                <q-btn class="mr-1 rounded-xl" unelevated :outline="user.isVaccineReady != 'Not Ready'" color="negative" label="Vaccine Not Ready" @click="toggleVaccineStatus(user, 'Not Ready')"/>
                <q-btn class="mr-1 rounded-xl" unelevated :outline="user.isVaccineReady != 'Pending'" color="primary" label="Vaccine Pending" @click="toggleVaccineStatus(user, 'Pending')"/>
                <q-btn class="mr-1 rounded-xl" unelevated :outline="user.isVaccineReady != 'Ready'" color="positive" label="Vaccine Ready" @click="toggleVaccineStatus(user, 'Ready')"/>
                <div class='my-1'/>
                <q-btn class="mr-1 rounded-xl" unelevated :outline="user.isVaccinated" label="Not Vaccinated" color="negative" @click="toggleVaccinated(user, false)"/>
                <q-btn class="mr-1 rounded-xl" unelevated  :outline="!user.isVaccinated" label="Vaccinated" color="green" @click="toggleVaccinated(user, true)"/>
                <div class='my-1'/>
                <q-btn class="mr-1 rounded-xl" unelevated :outline="!user.isPUI" :color="user.isPUI ? 'red' : 'green'" label='Under Investigation' @click='togglePUI(user, !user.isPUI)'/>
                <q-btn class="mr-1 rounded-xl" unelevated :outline="!user.isPUM" :color="user.isPUM ? 'red' : 'green'" label='Under Monitoring' @click='togglePUM(user, !user.isPUM)'/>
                <div class='my-2'/>
                <div class='grid grid-cols-3 gap-2'>
                  <q-input class="mr-1" unelevated debounce='500' @input='computeDiscrepancies' outlined label="Vaccine Manufacturer" v-model="user.vaccineManufacturer"/>
                  <q-input class="mr-1" unelevated debounce='500' @input='computeDiscrepancies' type='number' outlined label='Dosage No.' v-model='user.dosageNumber'/>
                  <q-input class="mr-1" unelevated debounce='500' type='string' outlined label='Group' v-model='user.group'/>
                </div>
                <div class='grid grid-cols-3 gap-2'>
                  <div v-for="item in extraModifiableUserFields" :key="item.name">
                    <div v-if="item.type === 'boolean'">
                      <q-item>
                        <q-toggle v-model="user[item.name]" :label="item.displayName"/>
                      </q-item>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        <!-- </transition-group> -->
        <empty-placeholder v-if='paginatedUsers.length === 0' icon='fas fa-question' title='No users added' subtitle='You need to add users to the editor panel on the select tab first.'/>
      </div>
      <div>
        <div class='text-h6 mb-8'>DISCREPANCIES</div>
        <transition-group name="transition">
          <empty-placeholder key='pl' v-if='discrepancies.length === 0' icon='fas fa-check' title='No discrepancies detected' subtitle="You're good to go!"/>
          <div v-for='discrepancy in discrepancies' :key='discrepancy.title'>
            <q-card class='mb-4 ring-4 ring-gray-300 rounded-2xl shadow-xl border-3'>
              <div>
                <div class='p-4'>
                  <div class='flex flex-nowrap'>
                    <q-icon size='lg' name='fas fa-exclamation'/>
                    <b>{{discrepancy.title}}</b>
                  </div>
                  <i v-html='discrepancy.subtitle'/>
                </div>
              </div>
            </q-card>
          </div>
        </transition-group>
      </div>
    </div>
    <q-page-sticky :offset='[20, 20]' position="bottom-right">
      <q-btn
        fab
        round
        @click="showOptionsDialog = !showOptionsDialog"
        :disable="store.usersToModify.length === 0"
        class="p-2"
        color="secondary"
        direction="up"
        icon="expand_less"
      />
      <q-dialog v-model="showOptionsDialog">
        <q-card>
          <div class="p-4 text-h6">Batch Modify</div>
          <q-list bordered>
            <q-item clickable v-ripple @click='markAllVaccineStatus'>
              <q-item-section>Vaccine Status...</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-syringe"/>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click='setAllVaccineManufacturer'>
              <q-item-section>Vaccine Manufacturer...</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-building"/>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click='markAllVaccinationStatus'>
              <q-item-section>Vaccination Status...</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-shield-alt"/>
              </q-item-section>
            </q-item>
            <hr>
            <q-item clickable v-ripple @click='setAllDosageNumber'>
              <q-item-section>Dosage Number...</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-circle-notch"/>
              </q-item-section>
            </q-item>
            <hr>
            <q-item clickable v-ripple @click='markAllPUI'>
              <q-item-section>Investigation...</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-search"/>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click='markAllPUM'>
              <q-item-section>Monitoring...</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-eye"/>
              </q-item-section>
            </q-item>
            <hr>
            <q-item clickable v-ripple @click='setAllGroup'>
              <q-item-section>Group...</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-pen"/>
              </q-item-section>
            </q-item>
          </q-list>
          <hr>
          <div class="p-4 text-h6">Others</div>
          <q-list>
            <q-item 
              v-for="item in extraModifiableUserFields" 
              :key="item.name" clickable v-ripple 
              @click='setAllArbitraryField(item.name, item.displayName, item.type)'
            >
              <q-item-section>{{item.displayName}}</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-pen"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
      <q-btn
        class="p-2 mx-2"
        :disable="store.usersToModify.length === 0"
        label="Discard"
        color="negative"
        icon="close"
        @click="confirmDiscard"
        fab
        />
      <q-btn
        class="p-2 mx-2"
        :disable="store.usersToModify.length === 0"
        label="Commit changes"
        color="primary"
        icon="check"
        @click="confirmSubmit"
        fab
        />
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import store from 'src/api/store';
import Vue from 'vue';
import EmptyPlaceholder from 'components/EmptyPlaceholder.vue';

export default Vue.extend({
  name: 'EditVaccinationStatus',
  components: { EmptyPlaceholder },
  data() {
    return {
      store,
      showOptionsDialog: false,
      searchFilter: '',
      usersPerPage: 10,
      pageIndex: 1,
      discrepancies: [] as {title: string, subtitle: string}[],
      extraModifiableUserFields: [] as any[],
    }
  },
  async activated() {
    this.extraModifiableUserFields = (await store.axios.get('/admin/extraModifiableUserFields')).data
    this.computeDiscrepancies()
  },
  computed: {
    filteredUsers (): Record<string,any>[] {
      if (this.searchFilter === '') return this.store.usersToModify;
      const result = [];
      for (const user of store.usersToModify) {
        const name = `${user.firstName} ${user.middleName} ${user.lastName}`;
        if (name.indexOf(this.searchFilter) !== -1) {
          result.push(user);
        }
      }
      return result;
    },
    paginatedUsers () : Record<string,any>[] {
      return this.filteredUsers.slice((this.pageIndex-1) * this.usersPerPage, ((this.pageIndex-1) * this.usersPerPage) + this.usersPerPage);
    }
  },
  methods: {
    computeDiscrepancies() {
      console.log('computing')
      this.discrepancies = []
      for (const user of store.usersToModify) {
        user.hasDiscrepancy = false;
        if (!(user.isVaccineReady === 'Ready') && user.isVaccinated) {
          this.discrepancies.push({
            title: `${user.firstName} is apparently vaccinated, but vaccine status is ${user.isVaccineReady}`,
            subtitle: `
                      <ul>
                        <li>Change ${user.firstName}'s vaccination status to <b>Not Vaccinated</b></li>
                        <li>Set the vaccine status to <b>Ready.</b></li>
                      </ul>
                      `
          })
          user.hasDiscrepancy = true;
        }
        if (user.isVaccineReady === 'Ready' && !user.vaccineManufacturer) {
          this.discrepancies.push({
            title: `${user.firstName}'s vaccine is Ready, but no vaccine manufacturer is set`,
            subtitle: `
                      <ul>
                       <li> Set a vaccine manufacturer </li>
                       <li> Set vaccine status to <b>Not Ready</b> / <b>Pending.</b> </li>
                      </ul>
                      `
          })
          user.hasDiscrepancy = true;
        }
      }
    },
    vaccineStatusStyling(vaccineStatus: string) {
      if (vaccineStatus === 'Not Ready') {
        return 'text-red-700';
      } else if (vaccineStatus === 'Pending') {
        return 'text-blue-500';
      } else if (vaccineStatus === 'Ready') {
        return 'text-green-500';
      }
    },

    toggleVaccinated(user: Record<string,any>, value: boolean) {
        user.isVaccinated = value;
        this.computeDiscrepancies()
    },

    toggleVaccineStatus(user: Record<string,any>, isVaccineReady: string) {
      user.isVaccineReady = isVaccineReady;
      this.computeDiscrepancies()
    },
    markAllVaccineStatus() {
      this.$q.dialog({
        title: 'Set all vaccine status',
        options: {
          type: 'radio',
          model: '', 
          items: [
            {label: 'Not Ready', value: 'Not Ready'},
            {label: 'Pending', value: 'Pending'},
            {label: 'Ready', value: 'Ready'}
          ]
        }
      }).onOk((data: string) => {
        for (const user of store.usersToModify) {
          user.isVaccineReady = data
        }
        this.computeDiscrepancies()
      })
    },
    markAllVaccinationStatus() {
      this.$q.dialog({
        title: 'Set Vaccination Status',
        options: {
          type: 'checkbox',
          model: [],
          items: [
            { label: 'Is Vaccinated?', value: true }
          ]
        }
      }).onOk((data: boolean[]) => {
        console.log(data)
        for (const user of store.usersToModify) {
          user.isVaccinated = data.includes(true)
        }
        this.computeDiscrepancies()
      })
    },
    confirmDiscard() {
      this.$q.dialog({
        title: 'Discard changes?',
        cancel: true,
        message: `Discard the changes you're making on ${store.usersToModify.length} users?`
      }).onOk(() => {
        store.usersToModify = [];
      })
    },
    togglePUI(user: Record<string, any>, value: boolean) {
        user.isPUI = value
    },
    togglePUM(user: Record<string, any>, value: boolean) {
        user.isPUM = value
    },
    markAllPUI () {
      this.$q.dialog({
        title: 'Set Under Investigation',
        options: {
          type: 'checkbox',
          model: [],
          items: [
            { label: 'Is Under Investigation?', value: true }
          ]
        }
      }).onOk((data: boolean[]) => {
        for (const user of store.usersToModify) {
          this.togglePUI(user, data.includes(true))
        }
      })
    },
    markAllPUM () {
      this.$q.dialog({
        title: 'Set Under Monitoring',
        options: {
          type: 'checkbox',
          model: [],
          items: [
            { label: 'Is Under Monitoring?', value: true }
          ]
        }
      }).onOk((data: boolean[]) => {
        for (const user of store.usersToModify) {
          this.togglePUM(user, data.includes(true))
        }
      })
    },
    setAllVaccineManufacturer() {
      this.$q.dialog({
        title: 'Set all vaccine manufacturer',
        message: "Batch set all of these user's vaccine manufacturer fields.",
        prompt: {
          model: '',
        },
        cancel: true,
        persistent: true
      }).onOk((data: string) => {
        for (const user of store.usersToModify) {
          user.vaccineManufacturer = data;
        }
        this.computeDiscrepancies()
      })
    },
    setAllDosageNumber() {
      this.$q.dialog({
        title: 'Set all dosage number',
        message: "Batch set all of these user's dosage number fields.",
        prompt: {
          model: '',
          type: 'number'
        },
        cancel: true,
        persistent: true
      }).onOk((data: string) => {
        for (const user of store.usersToModify) {
          user.dosageNumber = parseInt(data);
        }
        this.computeDiscrepancies();
      })
    },
    setAllGroup() {
      this.$q.dialog({
        title: 'Set all group',
        message: "Batch set all of these user's groups",
        prompt: {
          model: '', 
          type: 'string'
        },
        cancel: true,
        persistent: true
      }).onOk((group: string|null) => {
        if (group === '') group = null;
        for (const user of store.usersToModify) {
          user.group = group;
        }
        this.computeDiscrepancies();
      })
    },
    setAllArbitraryField(field: string, displayName: string, type: string) {
      let options;
      switch(type) {
        case 'boolean': options = {model: [], type: 'checkbox' as const, items: [{label: displayName, value: field}]}; break;
        default: options = {model: ''};
      }
      console.log(field, displayName, type, options)
      this.$q.dialog({
        title: `Set all ${displayName}`,
        message: `Batch set all of these user's ${displayName} fields (${field})`,
        options
      }).onOk((data: any | any[]) => {
        for (const user of store.usersToModify) {
          if (type === 'boolean') {
            // @ts-ignore
            user[field] = data.includes(field)
          }
        }
      })
    },
    confirmSubmit() {
      this.$q.dialog({
        title: 'Commit changes?',
        cancel: true,
        message: `Commit the changes you're making on ${store.usersToModify.length} users?
        ${this.discrepancies.length !== 0 ? 'There are still discrepancies as well.' : ''}`
      }).onOk(async () => {
        this.$q.loading.show({message: 'Committing changes... This may take a while with lots of people...'});

        const performRequest = async (data: Record<string,any>[]): Promise<[boolean, string]> => {
          try {
            const response = await this.$axios.post('/admin/editUser', {
              // TODO: Support for arbitrary user fields
              
              data: data.map(user => {
                const result = {
                  id: user.id,
                  isVaccinated: user.isVaccinated,
                  isVaccineReady: user.isVaccineReady,
                  vaccineManufacturer: user.vaccineManufacturer ?? '',
                  isPUI: user.isPUI,
                  isPUM: user.isPUM,
                  dosageNumber: user.dosageNumber,
                  group: user.group,
                }

                // @ts-ignore
                this.extraModifiableUserFields.map(x => result[x.name] = user[x.name])

                return result
              })
            })

            if (!response.data.result) {
              return [false, response.data.message as string];
            } else {
              return [true, 'Saved changes!'];
            }
          } catch(err) {
            return [false, `Commit failed: ${err}`]
          }
        }

        const maxPerReq = 500;
        let opIsSuccess = true;

        for (let i = 0; i < (Math.ceil(store.usersToModify.length / maxPerReq)); i++) {
          const [isSuccess, message] = await performRequest(store.usersToModify.slice(i * maxPerReq, (i * maxPerReq) + maxPerReq));
          if (!isSuccess) {
            this.$q.notify({message, type: 'negative'})
            opIsSuccess = false;
            break;
          }
        }

        if (opIsSuccess) {
          this.$q.notify({message: 'Saved changes!'});
          store.usersToModify = [];
          this.computeDiscrepancies();
        }

        this.$q.loading.hide();

      })
    }
  }
});
</script>

<style>

</style>
