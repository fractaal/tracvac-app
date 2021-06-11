<template>
  <q-page class="px-8">
      <div class="flex flex-row justify-between pt-8 items-center">
        <h6 class="font-bold m-0 p-0">Health Declaration Form</h6>
      </div>
      <hr>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Are you below 16 years old?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="Below16" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Do you have allergies to PEG or polysorbate?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="AllergyPEGOrPolysorbate" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Do you have a severe allergic reaction after the 1st dose of the <b>Pfizer</b> vaccine?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="SevereAllergicReactionPfizer" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Do you have allergies to food, egg, medicines and/or with asthma?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="AllergyFood" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>If you do have an allergy or have asthma, will monitoring you for 30 minutes be a problem?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="AllergyFood.Monitor" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Do you have a history of bleeding orders or currently taking anti-coagulants?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="HistoryBleeding" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>If you do have history of bleeding disorders or taking anti-coagulants, is there an available 23 - 25 gauge syringe for injection?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="HistoryBleeding.AvailableSyringe" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Do you manifest any one of the following symptoms?</q-item-label>
          <q-item-label>
            <ul class="grid grid-cols-2 gap-4">
              <li>Fever / chills</li>
              <li>Headache</li>
              <li>Cough</li>
              <li>Colds</li>
              <li>Sore throat</li>
              <li>Myalgia</li>
              <li>Rashes</li>
              <li>Fatigue</li>
              <li>Weakness</li>
              <li>Loss of smell/taste</li>
              <li>Diarrhea</li>
              <li>Shortness of breath/difficulty in breathing</li>
              <li>Nausea/Vomiting</li>
              <li>Other symptoms of existing comorbidity</li>
            </ul>
          </q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="ManifestSymptoms" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Do you have Systolic Blood Pressure greater than or equal to 180 and/or Diastolic Blood Pressure greater than or equal to 120, with signs and symptoms of organ damage?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="BloodPressure" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Do you have a history of exposure to a confirmed or suspected COVID-19 case in the past 14 days?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="HistoryExposureCOVID" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>If you were previously diagnosed with COVID-19, are you <b>still</b> undergoing recovery or treatment?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="HistoryExposureCOVID.UndergoingTreatment" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Have you had attacks, admissions or changes in medication for the past three months?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="HadAttacks" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Have you received any vaccine in the past 14 days or plan to receive another vaccine 14 days following vaccination?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="ReceivedVaccine" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Have you received convalescent plasma or monoclonal antibodies for COVID-19 in the past 90 days? </q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="RecievedPlasma" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Are you pregnant?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="IsPregnant" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>If pregnant, are you in the 1st trimester?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="IsPregnant.InFirstTrimester" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Have you had any of the following diseases or health conditions?</q-item-label>
          <q-item-label caption>
            <li>HIV</li>
            <li>Cancer/ Malignancy y and is currently undergoing chemotherapy, radiotherapy, immunotherapy or other treatment</li>
            <li>Underwent Transplant</li>
            <li>Under Steroid Medication/ Treatment</li>
            <li>Bed ridden, terminal illness, less than 6 months prognosis</li>
            <li>Autoimmune disease</li>
          </q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="HadHealthConditions" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>If you do have any of the abovementioned condition, is there any objection to vaccination from presented medical clearance prior to vaccination day?</q-item-label>
        </q-item-section>
        <q-item-section avatar top>
          <q-checkbox v-model="form" val="HadHealthConditions.Objection" />
        </q-item-section>
      </q-item>
      <q-btn class="block mx-auto p-4" label="Submit" @click="submit" unelevated color="blue"/>
  </q-page>
</template>

<script>
let _api

export async function init (api) {
  console.log('‼ pag-ibig plugin initialize')

  _api = Object.assign({}, api)

  const { routes } = this.$router.options
  const routeData = routes.find(r => r.path === '/home')
  routeData.children = [...routeData.children,
    { path: '/healthDeclarationForm', component }
  ]
  this.$router.addRoutes([routeData])
  this.store.menu.push({
    name: 'Health Declaration Form',
    icon: 'fas fa-pen',
    action: () => this.$router.push('/healthDeclarationForm')
  })

  const { data } = (await api.get('/user'))

  if (data.result && data.user.healthDeclarationData == null) {
    this.$q.dialog({ title: 'Health Declaration Form Required', message: 'Please fill in this health declaration form. It won\'t take five minutes!' })
    this.$router.push('/healthDeclarationForm')
  }

  console.log('✅ pag-ibig plugin setup complete')
}

const component = {
  name: 'PagIbigPlugin',
  data () {
    return {
      api: _api,
      isCompleted: false,
      form: []
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isCompleted) {
      next(true)
    } else {
      console.log('Blocking navigation -- form not filled yet!')
      this.$q.notify({ message: 'Please fill in this form first!' })
      next(false)
    }
  },
  methods: {
    submit () {
      this.$q.dialog({ message: 'Are you sure you want to submit?', cancel: true }).onOk(async () => {
        const response = await this.api.post('/healthDeclarationForm', this.form)

        if (response.data?.result) {
          this.isCompleted = true
          this.$q.notify({ message: 'Thank you!', type: 'positive' })
          this.$router.back()
        }
      })
    }
  }
}

export default component
</script>

<style>

</style>
