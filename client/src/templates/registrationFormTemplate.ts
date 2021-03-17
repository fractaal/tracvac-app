export default [
  {
    title: 'Personal Information',
    description: 'Input your personal data here.',
    formItems: [
      {
        name: 'lastName',
        displayName: 'Last Name',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'firstName',
        displayName: 'First Name',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'middleName',
        displayName: 'Middle Name',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'suffix',
        displayName: 'Suffix',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'contactNumber',
        displayName: 'Contact Number',
        type: 'Number',
        format: 'Text',
        limit: 12
      },
      {
        name: 'fullAddress',
        displayName: 'Full Address',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'province',
        displayName: 'Province',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'municipalityOrCity',
        displayName: 'Municipality or City',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'barangay',
        displayName: 'Barangay',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'sex',
        displayName: 'Sex',
        options: [
          '01 - Female',
          '02 - Male',
          '03 - Not To Disclose'
        ],
        type: 'String',
        format: 'Dropdown'
      },
      {
        name: 'dateOfBirth',
        displayName: 'Date of Birth',
        type: 'Date',
        format: 'DatePicker'
      },
      {
        name: 'civilStatus',
        displayName: 'Civil Status',
        options: [
          '01 - Single',
          '02 - Married',
          '03 - Widow/Widower',
          '04 - Separated/Annulled',
          '05 - Living with Partner'
        ],
        type: 'String',
        format: 'Dropdown'
      },
      {
        name: 'pregnancyStatus',
        displayName: 'Pregnant?',
        type: 'Boolean',
        format: 'Dropdown',
        conditionalFunction: (data) => {
          return data.sex === '01 - Female'
        }
      }
    ]
  },
  {
    title: 'Work Information',
    description: 'Input your work information here.',
    formItems: [
      {
        name: 'category',
        displayName: 'Employment Category',
        options: [
          '01 - Health Care Worker',
          '02 - Senior Citizen',
          '03 - Indigent',
          '04 - Uniformed Personnel',
          '05 - Essential Worker',
          '06 - Other'
        ],
        type: 'String',
        format: 'Dropdown'
      },
      {
        name: 'categoryID',
        displayName: 'Category ID',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'philHealthID',
        displayName: 'Philhealth ID',
        type: 'Number',
        format: 'Text',
        limit: 12
      },

      {
        name: 'employed',
        displayName: 'Employment Type',
        options: [
          '01 - Government Employed',
          '02 - Private Employed',
          '03 - Self Employed',
          '04 - Private Practitioner',
          '05 - Others'
        ],
        type: 'String',
        format: 'Dropdown'
      },
      {
        name: 'profession',
        displayName: 'Profession',
        options: [
          '01 - Dental Hygienist',
          '02 - Dental Technologist',
          '03 - Dentist',
          '04 - Medical Technologist',
          '05 - Midwife',
          '06 - Nurse',
          '07 - Nutritionist/Dietician',
          '08 - Occupational Therapist',
          '09 - Optomerist',
          '10 - Pharmacist',
          '11 - Physical Therapist',
          '12 - Physician',
          '13 - Radiologic Technologist',
          '14 - Respiratory Therapist',
          '15 - X-ray Technologist',
          '16 - Barangay Health Worker',
          '17 - Maintenance Staff',
          '18 - Administrative Staff',
          '19 - Other Workers in Frontline Health Services'
        ],
        type: 'String',
        format: 'Dropdown'
      },
      {
        name: 'otherProfession',
        displayName: 'Please specify profession:',
        type: 'String',
        format: 'Text',
        conditionalFunction (data) {
          return data.profession === '19 - Other Workers in Frontline Health Services'
        }
      },
      {
        name: 'employerName',
        displayName: 'Employer Name',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'employerLGU',
        displayName: 'Employer LGU',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'employerAddress',
        displayName: 'Employer Address',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'employerContactNumber',
        displayName: 'Employer Contact Number',
        type: 'Number',
        format: 'Text',
        limit: 12
      }
    ]
  },
  {
    title: 'Medical History',
    description: 'All information regarding your medical history goes here.',
    formItems: [
      {
        name: 'directCOVID',
        displayName: 'Providing care?',
        description: 'Are you providing direct COVID care to a patient?',
        type: 'Boolean',
        format: 'Dropdown'
      },
      {
        name: 'withAllergy',
        displayName: 'With Allergy?',
        type: 'Boolean',
        format: 'Dropdown'
      },
      {
        name: 'allergy',
        displayName: 'Allergy',
        type: 'String',
        format: 'Text',
        conditionalFunction (data) {
          if (data.withAllergy && data.withAllergy.value) { return true } else { return false }
        }
      },
      {
        name: 'withComorbidities',
        displayName: 'With Comorbidities?',
        description: 'A comorbidity is the simultaneous presence of two or more diseases or medical conditions in a patient.',
        type: 'Boolean',
        format: 'Dropdown'
      },
      {
        name: 'comorbidity',
        displayName: 'Comorbidity',
        type: 'String',
        options: [
          '01 - Hypertension',
          '02 - Heart Disease',
          '03 - Kidney Disease',
          '04 - Diabetes Mellitus',
          '05 - Bronchial Asthma',
          '06 - Immunodeficiency State',
          '07 - Cancer',
          '08 - Others'
        ],
        format: 'Dropdown',
        conditionalFunction (data) {
          if (data.withComorbidities && data.withComorbidities.value) { return true } else { return false }
        }
      },
      {
        name: 'covidHistory',
        displayName: 'Diagnosed with COVID-19?',
        description: 'Were you at all diagnosed with COVID-19?',
        type: 'Boolean',
        format: 'Dropdown'
      },
      {
        name: 'covidDate',
        displayName: 'Date of First Positive Result',
        description: 'The date of when you were first diagnosed with COVID-19.',
        type: 'Date',
        format: 'DatePicker',
        conditionalFunction (data) {
          if (data.covidHistory && data.covidHistory.value) return true; else return false
        }
      },
      {
        name: 'covidClassification',
        displayName: 'Classification of Infection',
        type: 'String',
        options: [
          '01 - Asymptomatic',
          '02 - Mild',
          '03 - Moderate',
          '04 - Severe',
          '05 - Critical'
        ],
        format: 'Dropdown'
      }
    ]
  },
  {
    title: 'Consent',
    description: 'Consent for scientific research.',
    formItems: [
      {
        name: 'consentForDataCollection',
        displayName: 'Electronic Informed Consent',
        description: 'Have you provided electronic informed consent for data collection?',
        type: 'String',
        options: [
          '01 - Yes',
          '02 - No',
          '03 - Unknown'
        ],
        format: 'Dropdown'
      },
      {
        name: 'consentForVaccination',
        displayName: 'Consent For Vaccination',
        description: 'Have you provided initial consent for vaccination?',
        type: 'String',
        options: [
          '01 - Yes',
          '02 - No',
          '03 - Unknown'
        ],
        format: 'Dropdown'
      }
    ]
  },
  {
    title: 'Credentials',
    description: 'Needed to log you in, and other things.',
    formItems: [
      {
        name: 'username',
        displayName: 'Username',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'email',
        displayName: 'E-mail',
        type: 'String',
        format: 'Text'
      },
      {
        name: 'password',
        displayName: 'Password',
        type: 'String',
        format: 'Password'
      }
    ]
  }

] as Section[]

interface FormItem {
  isSeparator: boolean;
  name: string;
  displayName: string;
  description?: string;
  type: string;
  options: string[];
  format: string;
  limit?: number;
  /**
   * Conditionally render this item based on current form data
   * @param data Current form data.
   */
  conditionalFunction?(data: Record<string, any>): boolean;
}

interface Section {
  title: string;
  description: string;
  formItems: FormItem[];
}
