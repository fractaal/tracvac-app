<template>
  <q-card>
    <q-card-section>
      <q-avatar class='mx-auto block mb-4 rounded-full ring-4 w-16 h-16 ring-blue-500 shadow-5'>
        <q-img ratio='1' :src='"http://localhost/" + user.profilePicturePath'/>
      </q-avatar>
      <div class='text-h6'>{{user.firstName}} {{user.middleName}} {{user.lastName}}</div>
      <div class='text-subtitle2'><i>@{{user.username}}</i></div>
    </q-card-section>
    <q-card-section class='space-x-2'>
      <q-badge :color='user.isPUM ? "red" : "green"'>
        {{user.isPUM ? 'Under Monitoring' : 'Not Under Monitoring'}}
      </q-badge>
      <q-badge :color='user.isPUI ? "red" : "green"'>
        {{user.isPUI ? 'Under Investigation' : 'Not Under Investigation'}}
      </q-badge>
      <hr>
      <div v-for='item in medicalHistory'>
        <p class='m-0 p-0'><b>{{item.displayName}}</b>: {{user[item.name]}}</p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import Vue from 'vue'
import { User } from 'src/models/UserModel';

const medicalHistory = [
  {
    name: 'preexistingCondition',
    displayName: 'Pre-existing Condition?',
  },
  {
    name: 'directCOVID',
    displayName: 'Providing care?',
  },
  {
    name: 'withAllergy',
    displayName: 'With Allergy?',
  },
  {
    name: 'allergy',
    displayName: 'Allergy',
  },
  {
    name: 'withComorbidities',
    displayName: 'With Comorbidities?',
  },
  {
    name: 'comorbidity',
    displayName: 'Comorbidity',
  },
  {
    name: 'covidHistory',
    displayName: 'Diagnosed with COVID-19?',
  },
  {
    name: 'covidDate',
    displayName: 'Date of First Positive Result',
  },
  {
    name: 'covidClassification',
    displayName: 'Classification of Infection',
  }
]

export default Vue.extend({
  props: {
    user: Object as () => User
  },
  data() {
    return {
      medicalHistory
    }
  },
  name: 'UserInfoCard'
});
</script>

<style scoped>

</style>
