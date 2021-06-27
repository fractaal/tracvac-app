import { TypeMap } from './baseTemplate'

function numberValidator (number: string) {
  const _number = String(number)
  if (!(/^\d+$/.test(_number))) return false
  if (_number[0] === '0') {
    if (_number.length === 11) {
      return true
    }
  }
  return false
}

const template = [
  {
    title: 'Personal Information',
    description: 'Input your personal data here.',
    formItems: [
      {
        name: 'lastName',
        displayName: 'Last Name',
        type: 'string',
        format: 'Text'
      },
      {
        name: 'firstName',
        displayName: 'First Name',
        type: 'string',
        format: 'Text'
      },
      {
        name: 'middleName',
        displayName: 'Middle Name',
        type: 'string',
        format: 'Text',
        isNotRequired: true
      },
      {
        name: 'suffix',
        displayName: 'Suffix',
        type: 'string',
        format: 'Text',
        // description: 'If none, write "N/A"',
        isNotRequired: true
      },
      {
        name: 'contactNumber',
        displayName: 'Contact Number',
        type: 'number',
        format: 'Text',
        limit: 12,
        rules: [
          (val: string) => numberValidator(val) || 'Must be a valid contact number.'
        ]
      },
      {
        name: 'fullAddress',
        displayName: 'Full Address',
        type: 'string',
        format: 'Text'
      },
      {
        name: 'province',
        displayName: 'Province',
        type: 'string',
        format: 'Text'
      },
      {
        name: 'municipalityOrCity',
        displayName: 'Municipality or City',
        type: 'string',
        format: 'Text'
      },
      {
        name: 'barangay',
        displayName: 'Barangay',
        type: 'string',
        format: 'Text'
      },
      {
        name: 'sex',
        displayName: 'Sex',
        options: [
          '01 - Female',
          '02 - Male',
          '03 - Not to Disclose'
        ],
        type: 'string',
        format: 'Dropdown'
      },
      {
        name: 'dateOfBirth',
        displayName: 'Date of Birth',
        type: 'date',
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
        type: 'string',
        format: 'Dropdown'
      },
      {
        name: 'pregnancyStatus',
        displayName: 'Pregnant?',
        type: 'boolean',
        format: 'Dropdown',
        conditionalFunction: (data: Record<string, any>) => {
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
        type: 'string',
        format: 'Dropdown'
      },
      {
        name: 'categoryID',
        displayName: 'Category ID',
        options: [
          'PRC ID',
          'OSCA / Senior Citizen ID',
          'Facility ID',
          'PWD ID',
          'Postal ID',
          'SSS ID',
          'Other'
        ],
        type: 'string',
        format: 'Dropdown'
      },
      {
        name: 'otherCategoryID',
        displayName: 'Category ID (Other)',
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.categoryID === 'Other'
        }
      },
      {
        name: 'categoryIDNumber',
        displayName: 'ID Number',
        type: 'string',
        format: 'Text',
        // description: 'If none, write "N/A"'
        isNotRequired: true
      },
      {
        name: 'philHealthID',
        displayName: 'Philhealth ID',
        type: 'number',
        format: 'Text',
        limit: 12,
        // description: 'If none, write "N/A"'
        isNotRequired: true
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
        type: 'string',
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
          '19 - Others'
        ],
        type: 'string',
        format: 'Dropdown'
      },
      {
        name: 'otherProfession',
        displayName: 'Please specify profession:',
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>) {
          return data.profession === '19 - Others'
        }
      },
      {
        name: 'employerName',
        displayName: 'Employer Name',
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.employed !== '03 - Self Employed'
        }
      },
      {
        name: 'employerLGU',
        displayName: 'Employer LGU',
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.employed !== '03 - Self Employed'
        }
      },
      {
        name: 'employerAddress',
        displayName: 'Employer Address',
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.employed !== '03 - Self Employed'
        }
      },
      {
        name: 'employerContactNumber',
        displayName: 'Employer Contact Number',
        type: 'number',
        format: 'Text',
        isNotRequired: true,
        limit: 12,
        rules: [
          (val: string) => numberValidator(val) || 'Must be a valid contact number.'
        ],
        conditionalFunction (data: Record<string, any>): boolean {
          return data.employed !== '03 - Self Employed'
        }
      }
    ]
  },
  {
    title: 'Medical History',
    description: 'All information regarding your medical history goes here.',
    formItems: [
      {
        name: '__preexistingCondition',
        displayName: 'Pre-existing Condition?',
        description: 'Do you have an existing medical condition?"',
        type: 'boolean',
        format: 'Dropdown'
      },
      {
        name: 'preexistingCondition',
        displayName: 'Pre-existing Conditions',
        description: `
          Please indicate your previous/existing medical conditions.<br>
          <i>i.e. Hypertension, Diabetes, Multiple Sclerosis</i>
        `,
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.__preexistingCondition === 'Yes'
        }
      },
      {
        name: 'directCOVID',
        displayName: 'Providing care?',
        description: 'Are you providing direct COVID care to a patient?',
        type: 'boolean',
        format: 'Dropdown',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.__preexistingCondition === 'Yes'
        }
      },
      {
        name: 'withAllergy',
        displayName: 'With Allergy?',
        type: 'boolean',
        format: 'Dropdown',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.__preexistingCondition === 'Yes'
        }
      },
      {
        name: 'allergy',
        displayName: 'Allergy',
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>) {
          return data.withAllergy === 'Yes' &&
            data.__preexistingCondition === 'Yes'
        }
      },
      {
        name: 'withComorbidities',
        displayName: 'With Comorbidities?',
        description: 'A comorbidity is the simultaneous presence of two or more diseases or medical conditions in a patient.',
        type: 'boolean',
        format: 'Dropdown',
        conditionalFunction (data: Record<string, any>): boolean {
          return data.__preexistingCondition === 'Yes'
        }
      },
      {
        name: 'comorbidity',
        displayName: 'Comorbidity',
        type: 'string',
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
        conditionalFunction (data: Record<string, any>) {
          return data.withComorbidities === 'Yes' &&
            data.__preexistingCondition === 'Yes'
        }
      },
      {
        name: 'otherComorbidity',
        displayName: 'Comorbidity (Others)',
        type: 'string',
        format: 'Text',
        conditionalFunction (data: Record<string, any>) {
          return data.comorbidity === '08 - Others' &&
            data.withComorbidities === 'Yes' &&
            data.__preexistingCondition === 'Yes'
        }
      },
      {
        name: 'covidHistory',
        displayName: 'Diagnosed with COVID-19?',
        description: 'Were you at all diagnosed with COVID-19?',
        type: 'boolean',
        format: 'Dropdown'
      },
      {
        name: 'covidDate',
        displayName: 'Date of First Positive Result',
        description: 'The date of when you were first diagnosed with COVID-19.',
        type: 'date',
        format: 'DatePicker',
        conditionalFunction (data: Record<string, any>) {
          return data.covidHistory === 'Yes'
        }
      },
      {
        name: 'covidClassification',
        displayName: 'Classification of Infection',
        type: 'string',
        options: [
          '01 - Asymptomatic',
          '02 - Mild',
          '03 - Moderate',
          '04 - Severe',
          '05 - Critical'
        ],
        format: 'Dropdown',
        conditionalFunction (data: Record<string, any>) {
          return data.covidHistory === 'Yes'
        }
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
        type: 'string',
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
        type: 'string',
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
        type: 'string',
        format: 'Text',
        rules: [
          (val: string) => val.length >= 8 || 'Your username must be at least 8 characters.'
        ]
      },
      {
        name: 'email',
        displayName: 'E-mail',
        type: 'string',
        format: 'Text',
        rules: [
          (val: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val) || 'Choose a valid email address.'
        ]
      },
      {
        name: 'password',
        displayName: 'Password',
        description: `
            Please <b>remember your password.</b> write it down on a piece of paper you won't lose, or use a password manager.
            <br><br>
            <b class="text-red-500">Losing your password means losing access to this account permanently.</b>
        `,
        type: 'string',
        format: 'Password'
      }
    ]
  }

] as const

type formItemName = (typeof template)[number]['formItems'][number]['name'] & string;
type formItemType = TypeMap[(typeof template)[number]['formItems'][number]['type']];

export type FormData = {
  [x in formItemName]?: formItemType
}

export default template
