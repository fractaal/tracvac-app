<template>
  <div>
    <div class="overflow-x-visible grid grid-cols-2 gap-4">
      <div>
        <div class='text-h6 mb-8'>EDIT VACCINATION STATUSES</div>
        <transition-group v-if='store.usersToModify.length !== 0' name="transition" mode="out-in">
          <q-card v-for="(user, idx) in store.usersToModify" :class='user.hasDiscrepancy ? "ring-4 ring-red-500" : ""' class="mb-8 shadow-none border border-solid border-gray-400" :key="user.id">
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
                  <q-btn outline label='View Logs' @click='$router.push("view-logs/" + user.id)'/>
                </div>
                <div>
                  <p :class="user.isVaccinated === true ? 'text-green-500' : 'text-red-700'" class="m-0 p-0 text-right font-extrabold">{{user.isVaccinated === true ? '✅ VACCINATED' : '❌ NOT VACCINATED'}}</p>
                  <p :class="vaccineStatusStyling(user.isVaccineReady)" class="m-0 p-0 text-right font-extrabold">VACCINE IS {{user.isVaccineReady.toUpperCase()}}</p>
                  <hr/>
                  <p class="m-0 p-0 text-right">UNDER INVESTIGATION: <b>{{user.isPUI ? 'Yes' : 'No'}}</b></p>
                  <p class="m-0 p-0 text-right">UNDER MONITORING: <b>{{user.isPUM ? 'Yes' : 'No'}}</b></p>
                </div>
              </div>
              <br>
              <div>
                <q-btn outline color="negative" label="Vaccine Not Ready" @click="toggleVaccineStatus(user, 'Not Ready')"/>
                <q-btn outline color="primary" label="Vaccine Pending" @click="toggleVaccineStatus(user, 'Pending')"/>
                <q-btn outline color="positive" label="Vaccine Ready" @click="toggleVaccineStatus(user, 'Ready')"/>
                <div class='my-4'/>
                <q-btn outline label="Mark as not vaccinated" @click="toggleVaccinated(user, false)"/>
                <q-btn outline label="Mark as vaccinated" color="secondary" @click="toggleVaccinated(user, true)"/>
                <div class='my-4'/>
                <q-btn outline label='Mark as Under Investigation' @click='togglePUI(user, !user.isPUI)'/>
                <q-btn outline label='Mark as Under Monitoring' @click='togglePUM(user, !user.isPUM)'/>
                <div class='my-4'/>
                <q-input debounce='500' @input='computeDiscrepancies' class="w-full mt-2" outlined label="Vaccine Manufacturer" v-model="user.vaccineManufacturer"/>
              </div>
            </q-card-section>
          </q-card>
        </transition-group>
        <empty-placeholder v-else icon='fas fa-question' title='No users added' subtitle='You need to add users to the editor panel on the select tab first.'/>
      </div>
      <div>
        <div class='text-h6 mb-8'>DISCREPANCIES</div>
        <transition-group name="transition">
          <empty-placeholder key='pl' v-if='discrepancies.length === 0' icon='fas fa-check' title='No discrepancies detected' subtitle="You're good to go!"/>
          <div v-for='discrepancy in discrepancies' :key='discrepancy.title'>
            <q-card class='mb-4'>
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
      <q-fab
        :disable="store.usersToModify.length === 0"
        class="p-2"
        color="secondary"
        direction="up"
        icon="expand_less"
      >
        <q-fab-action @click="setAllVaccineManufacturer" color="primary" icon="fas fa-pen" label="Set all vaccine manufacturer"/>
        <hr>
        <q-fab-action @click="markAllVaccineStatus('Not Ready')" color="negative" icon="fas fa-times" label="Mark all Vaccine not ready"/>
        <q-fab-action @click="markAllVaccineStatus('Pending')" color="primary" icon="fas fa-hourglass" label="Mark all Vaccine pending"/>
        <q-fab-action @click="markAllVaccineStatus('Ready')" color="positive" icon="fas fa-check" label="Mark all Vaccine ready"/>
        <hr>
        <q-fab-action @click="markAllVaccinationStatus(false)" color="negative" icon="fas fa-times " label="Mark all unvaccinated"/>
        <q-fab-action @click="markAllVaccinationStatus(true)" color="primary" icon="fas fa-check" label="Mark all vaccinated"/>
      </q-fab>
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
      discrepancies: [] as {title: string, subtitle: string}[],
    }
  },
  activated() {
    this.computeDiscrepancies()
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
            subtitle: `Change ${user.firstName}'s vaccination status to <b>Not Vaccinated</b>, or set the vaccine status to <b>Ready.</b>`
          })
          user.hasDiscrepancy = true;
        }
        if (user.isVaccineReady === 'Ready' && !user.vaccineManufacturer) {
          this.discrepancies.push({
            title: `${user.firstName}'s vaccine is Ready, but no vaccine manufacturer is set`,
            subtitle: `Set a vaccine manufacturer, or set vaccine status to <b>Not Ready</b> / <b>Pending.</b>`
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

    markAllVaccineStatus(status: string) {
      for (const user of store.usersToModify) {
        user.isVaccineReady = status
      }
      this.computeDiscrepancies()
    },
    markAllVaccinationStatus(boolean: boolean) {
      for (const user of store.usersToModify) {
        user.isVaccinated = boolean;
      }
      this.computeDiscrepancies()
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
    confirmSubmit() {
      this.$q.dialog({
        title: 'Commit changes?',
        cancel: true,
        message: `Commit the changes you're making on ${store.usersToModify.length} users?
        ${this.discrepancies.length !== 0 ? 'There are still discrepancies as well.' : ''}`
      }).onOk(async () => {

        try {
          const response = await this.$axios.post('/admin/editUser', {
            data: store.usersToModify.map(user => {
              return {
                id: user.id,
                isVaccinated: user.isVaccinated,
                isVaccineReady: user.isVaccineReady,
                vaccineManufacturer: user.vaccineManufacturer ?? '',
                isPUI: user.isPUI,
                isPUM: user.isPUM,
              }
            })
          })

          if (!response.data.result) {
            this.$q.notify({message: response.data.message, type: 'negative'})
          } else {
            this.$q.notify({message: 'Saved changes!'});
            store.usersToModify = [];
            this.computeDiscrepancies()
          }
        } catch(err) {
          this.$q.notify({
            message: `Commit failed: ${err}`,
            type: 'negative',
          })
        }

        /** Old very inefficient way of updating users
        try {
          await Promise.all(store.usersToModify.map(async user => {
            await this.$axios.post('/admin/editUser', {
              userId: user.id,
              isVaccinated: user.isVaccinated,
              isVaccineReady: user.isVaccineReady,
              vaccineManufacturer: user.vaccineManufacturer,
            })
          }))
          store.usersToModify = [];
        } catch (e) {
          this.$q.notify({
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              message: `Commit failed - ${e}`
          })
        }
         */
      })
    },
    togglePUI (user: Record<string,any>, value: boolean) {
      user.isPUI = value;
    },
    togglePUM (user: Record<string,any>, value: boolean) {
      user.isPUM = value;
    },
    setAllVaccineManufacturer() {
      this.$q.dialog({
        title: "Set all vaccine manufacturer",
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
    }
  }
});
</script>

<style>

</style>
