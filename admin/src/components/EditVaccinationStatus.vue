<template>
  <div>
    <div class="mt-12 overflow-x-visible">
      <transition-group name="transition" mode="out-in">
        <q-card v-for="(user, idx) in store.usersToModify" class="mb-8 shadow-none border border-solid border-gray-400" :key="user.id">
          <q-card-section>
            <div class="flex flex-row justify-between">
              <q-btn class="absolute -mt-8 -ml-8" round color="negative" icon="close" @click="store.usersToModify.splice(idx, 1)"/>
              <div>
                <h6 class="m-0 p-0 font-bold">{{user.firstName}} {{user.lastName}}</h6>
                <p class="m-0 p-0">{{user.username}}</p>
              </div>
              <div>
                <p :class="user.isVaccinated === 1 ? 'text-green-500' : 'text-red-700'" class="m-0 p-0 text-right font-extrabold">{{user.isVaccinated === 1 ? '✅ VACCINATED' : '❌ NOT VACCINATED'}}</p>
                <p :class="vaccineStatusStyling(user.isVaccineReady)" class="m-0 p-0 text-right font-extrabold">VACCINE IS {{user.isVaccineReady.toUpperCase()}}</p>
                <hr/>
                <p class="m-0 p-0 text-right">UNDER INVESTIGATION: <b>{{user.isPUI ? 'Yes' : 'No'}}</b></p>
                <p class="m-0 p-0 text-right">UNDER MONITORING: <b>{{user.isPUM ? 'Yes' : 'No'}}</b></p>
              </div>
            </div>
            <br>
            <div>
              <q-btn outline color="negative" label="Vaccine Not Ready" @click="toggleVaccineStatus(user, 'Not Ready')"/>
              <q-btn outline color="primary" class="ml-1" label="Vaccine Pending" @click="toggleVaccineStatus(user, 'Pending')"/>
              <q-btn outline color="positive" class="ml-1" label="Vaccine Ready" @click="toggleVaccineStatus(user, 'Ready')"/>
              <q-input :rules="[val => !!val || 'Must not be empty.']" class="float-right w-2/5" outlined label="Vaccine Manufacturer" v-model="user.vaccineManufacturer"/>
              <br/>
              <q-btn class="mt-2" outline label="Mark as not vaccinated" @click="toggleVaccinated(user, false)"/>
              <q-btn class="mt-2 ml-1" outline label="Mark as vaccinated" color="secondary" @click="toggleVaccinated(user, true)"/>
              <br/>
              <q-btn class='mt-2' outline label='Mark as Under Investigation' @click='togglePUI(user, !user.isPUI)'/>
              <q-btn class='mt-2 ml-1' outline label='Mark as Under Monitoring' @click='togglePUM(user, !user.isPUM)'/>
            </div>
          </q-card-section>
        </q-card>
      </transition-group>
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
        <q-fab-action @click="markAllVaccinationStatus(0)" color="negative" icon="fas fa-times " label="Mark all unvaccinated"/>
        <q-fab-action @click="markAllVaccinationStatus(1)" color="primary" icon="fas fa-check" label="Mark all vaccinated"/>
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
export default Vue.extend({
  name: 'EditVaccinationStatus',
  data() {
    return {
      store
    }
  },
  methods: {
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
      if (user.isVaccineReady === 'Ready' || !value ) {
        user.isVaccinated = value ? 1 : 0;
      } else {
        this.$q.dialog({
          title: 'Discrepancy',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: `You can't mark ${user.username} vaccinated becauase their vaccination status is ${user.isVaccineReady}.`
        })
      }
    },

    toggleVaccineStatus(user: Record<string,any>, isVaccineReady: string) {
      user.isVaccineReady = isVaccineReady;
      if (user.isVaccinated && isVaccineReady === 'Not Ready') {
        this.toggleVaccinated(user, false);
      }
    },
    markAllVaccineStatus(status: string) {
      if (status == 'Not Ready') this.markAllVaccinationStatus(0);
      for (const user of store.usersToModify) {
        user.isVaccineReady = status
      }
    },
    markAllVaccinationStatus(boolean: number) {
      if (boolean === 1) {
        this.markAllVaccineStatus('Ready')
      }
      for (const user of store.usersToModify) {
        user.isVaccinated = boolean;
      }
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
        message: `Commit the changes you're making on ${store.usersToModify.length} users?`
      }).onOk(async () => {

        try {
          const response = await this.$axios.post('/admin/editUser', {
            data: store.usersToModify.map(user => {
              return {
                id: user.id,
                isVaccinated: user.isVaccinated,
                isVaccineReady: user.isVaccineReady,
                vaccineManufacturer: user.vaccineManufacturer,
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
      })
    }
  }
});
</script>

<style>

</style>
