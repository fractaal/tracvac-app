<template>
  <q-page class="px-12 pb-32">
      <div class="flex flex-row justify-between pt-8 items-center">
        <h6 class="font-bold m-0 p-0">{{name}}'s Health Declaration Form </h6>
      </div>
      <hr>
      <div v-if="form != null">
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Are you below 16 years old?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="Below16" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Do you have allergies to PEG or polysorbate?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="AllergyPEGOrPolysorbate" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Do you have a severe allergic reaction after the 1st dose of the <b>Pfizer</b> vaccine?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="SevereAllergicReactionPfizer" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Do you have allergies to food, egg, medicines and/or with asthma?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="AllergyFood" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>If you do have an allergy or have asthma, will monitoring you for 30 minutes be a problem?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="AllergyFood.Monitor" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Do you have a history of bleeding orders or currently taking anti-coagulants?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="HistoryBleeding" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>If you do have history of bleeding disorders or taking anti-coagulants, is there an available 23 - 25 gauge syringe for injection?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="HistoryBleeding.AvailableSyringe" disable />
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
            <q-checkbox v-model="form" val="ManifestSymptoms" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Do you have Systolic Blood Pressure greater than or equal to 180 and/or Diastolic Blood Pressure greater than or equal to 120, with signs and symptoms of organ damage?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="BloodPressure" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Do you have a history of exposure to a confirmed or suspected COVID-19 case in the past 14 days?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="HistoryExposureCOVID" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>If you were previously diagnosed with COVID-19, are you <b>still</b> undergoing recovery or treatment?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="HistoryExposureCOVID.UndergoingTreatment" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Have you had attacks, admissions or changes in medication for the past three months?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="HadAttacks" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Have you received any vaccine in the past 14 days or plan to receive another vaccine 14 days following vaccination?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="ReceivedVaccine" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Have you received convalescent plasma or monoclonal antibodies for COVID-19 in the past 90 days? </q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="RecievedPlasma" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Are you pregnant?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="IsPregnant" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>If pregnant, are you in the 1st trimester?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="IsPregnant.InFirstTrimester" disable />
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
            <q-checkbox v-model="form" val="HadHealthConditions" disable />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>If you do have any of the abovementioned condition, is there any objection to vaccination from presented medical clearance prior to vaccination day?</q-item-label>
          </q-item-section>
          <q-item-section avatar top>
            <q-checkbox v-model="form" val="HadHealthConditions.Objection" disable />
          </q-item-section>
        </q-item>
      </div>
      <div v-else>
        <div class="text-h6 block mx-auto font-black text-italic text-gray-500 text-center">This user hasn't filled up their health declaration form yet.</div>
      </div>
  </q-page>
</template>

<script>
let store

export async function init () {
  console.log('‼ pag-ibig plugin initialize')

  store = Object.assign({}, store, this.store)

  const { routes } = this.$router.options
  const routeData = routes.find(r => r.path === '/')
  routeData.children = [...routeData.children,
    { path: '/healthDeclarationForm/:id', component }
  ]
  this.$router.addRoutes([routeData])
  this.store.userActions.push({
    name: 'Show Health Declaration Form',
    action: (id) => this.$router.push('/healthDeclarationForm/' + id)
  })

  console.log('✅ pag-ibig plugin setup complete')
}

const component = {
  name: 'PagIbigPlugin',
  data () {
    return {
      store,
      name: '',
      form: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.form = [])
  },
  async activated () {
    this.$q.loading.show()
    try {
      const { data } = await this.store.axios.get('/admin/healthDeclarationForm/' + this.$route.params.id)

      console.log(data)

      if (Array.isArray(data.data.healthDeclarationData)) {
        this.form = data.data.healthDeclarationData
        this.name = `${data.data.firstName} ${data.data.middleName} ${data.data.lastName}`
      } else {
        this.name = `${data.data.firstName} ${data.data.middleName} ${data.data.lastName}`
        this.form = null
      }
    } catch(err) {
      this.$q.notify({message: `Error occured while loading health declaration: ${err}`, type: 'negative'})
    }
    this.$q.loading.hide()
  }
}

export default component
</script>

<style>

</style>
