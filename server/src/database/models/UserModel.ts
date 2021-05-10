import { BaseModel } from './BaseModel'

export enum UserCategoryEnum {
  ITEM_0 = '01 - Health Care Worker',
  ITEM_1 = '02 - Senior Citizen',
  ITEM_2 = '03 - Indigent',
  ITEM_3 = '04 - Uniformed Personnel',
  ITEM_4 = '05 - Essential Worker',
  ITEM_5 = '06 - Other'
}

export enum UserSexEnum {
  ITEM_0 = '01 - Female',
  ITEM_1 = '02 - Male',
  ITEM_2 = '03 - Not to Disclose'
}

export enum UserEmployedEnum {
  ITEM_0 = '01 - Government Employed',
  ITEM_1 = '02 - Private Employed',
  ITEM_2 = '03 - Self Employed',
  ITEM_3 = '04 - Private Practitioner',
  ITEM_4 = '05 - Others'
}

export enum UserProfessionEnum {
  ITEM_0 = '01 - Dental Hygienist',
  ITEM_1 = '02 - Dental Technologist',
  ITEM_2 = '03 - Dentist',
  ITEM_3 = '04 - Medical Technologist',
  ITEM_4 = '05 - Midwife',
  ITEM_5 = '06 - Nurse',
  ITEM_6 = '07 - Nutritionist/Dietician',
  ITEM_7 = '08 - Occupational Therapist',
  ITEM_8 = '09 - Optomerist',
  ITEM_9 = '10 - Pharmacist',
  ITEM_10 = '11 - Physical Therapist',
  ITEM_11 = '12 - Physician',
  ITEM_12 = '13 - Radiologic Technologist',
  ITEM_13 = '14 - Respiratory Therapist',
  ITEM_14 = '15 - X-ray Technologist',
  ITEM_15 = '16 - Barangay Health Worker',
  ITEM_16 = '17 - Maintenance Staff',
  ITEM_17 = '18 - Administrative Staff',
  ITEM_18 = '19 - Other Workers in Frontline Health Services'
}

export enum UserComorbidityEnum {
  ITEM_0 = '01 - Hypertension',
  ITEM_1 = '02 - Heart Disease',
  ITEM_2 = '03 - Kidney Disease',
  ITEM_3 = '04 - Diabetes Mellitus',
  ITEM_4 = '05 - Bronchial Asthma',
  ITEM_5 = '06 - Immunodeficiency State',
  ITEM_6 = '07 - Cancer',
  ITEM_7 = '08 - Others'
}

export enum UserCovidClassificationEnum {
  ITEM_0 = '01 - Asymptomatic',
  ITEM_1 = '02 - Mild',
  ITEM_2 = '03 - Moderate',
  ITEM_3 = '04 - Severe',
  ITEM_4 = '05 - Critical'
}

export enum UserConsentForDataCollectionEnum {
  ITEM_0 = '01 - Yes',
  ITEM_1 = '02 - No',
  ITEM_2 = '03 - Unknown'
}

export enum UserConsentForVaccinationEnum {
  ITEM_0 = '01 - Yes',
  ITEM_1 = '02 - No',
  ITEM_2 = '03 - Unknown'
}

export enum VaccineReadyStatus {
  ITEM_0 = 'Not Ready',
  ITEM_1 = 'Pending',
  ITEM_2 = 'Ready',
}

export class UserModel extends BaseModel {
  id!: number;
  username!: string
  password!: string
  email!: string
  profilePicturePath!: string
  isPUI!: boolean
  isPUM!: boolean
  isVaccinated!: boolean
  vaccineManufacturer!: string
  isVaccineReady!: VaccineReadyStatus
  category!: UserCategoryEnum
  categoryID!: string
  philHealthID!: string
  lastName!: string
  firstName!: string
  middleName?: string
  suffix!: string
  contactNumber!: string
  fullAddress!: string
  province!: string
  municipalityOrCity!: string
  barangay!: string
  sex!: UserSexEnum
  dateOfBirth!: string
  employed!: UserEmployedEnum
  profession!: UserProfessionEnum
  otherProfession!: string
  otherComorbidity!: string
  directCOVID!: boolean
  employerName!: string
  employerLGU!: string
  employerAddress!: string
  employerContactNumber!: string
  pregnancyStatus!: boolean
  withAllergy!: boolean
  allergy!: string
  withComorbidities!: boolean
  comorbidity!: UserComorbidityEnum
  covidHistory!: boolean
  covidDate!: string
  dosageNumber!: number
  covidClassification!: UserCovidClassificationEnum
  consentForDataCollection!: UserConsentForDataCollectionEnum
  consentForVaccination!: UserConsentForVaccinationEnum
  lastVaccinationTime!: string;

  static tableName = 'users'

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'username',
        'password',
        'email',
        'category',
        'lastName',
        'firstName',
        // 'middleName',
        'fullAddress',
        'province',
        'municipalityOrCity',
        'barangay',
        'sex',
        'dateOfBirth',
        'civilStatus',
        'covidHistory'
      ],
      properties: {
        username: {
          type: 'string',
          minLength: 8,
          maxLength: 100
        },
        password: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        category: {
          type: 'string',
          enum: [
            '01 - Health Care Worker',
            '02 - Senior Citizen',
            '03 - Indigent',
            '04 - Uniformed Personnel',
            '05 - Essential Worker',
            '06 - Other'
          ]
        },
        categoryID: {
          type: 'string'
        },
        philHealthID: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        firstName: {
          type: 'string'
        },
        middleName: {
          type: 'string'
        },
        suffix: {
          type: 'string'
        },
        contactNumber: {
          type: 'string'
        },
        fullAddress: {
          type: 'string'
        },
        province: {
          type: 'string'
        },
        municipalityOrCity: {
          type: 'string'
        },
        barangay: {
          type: 'string'
        },
        sex: {
          type: 'string',
          enum: ['01 - Female', '02 - Male', '03 - Not to Disclose']
        },
        dateOfBirth: {
          type: 'string',
          // format: 'date'
        },
        employed: {
          type: 'string',
          enum: [
            '01 - Government Employed',
            '02 - Private Employed',
            '03 - Self Employed',
            '04 - Private Practitioner',
            '05 - Others'
          ]
        },
        profession: {
          type: 'string',
          enum: [
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
          ]
        },
        otherProfession: {
          type: 'string'
        },
        directCOVID: {
          type: 'boolean'
        },
        employerName: {
          type: 'string'
        },
        employerLGU: {
          type: 'string'
        },
        employerAddress: {
          type: 'string'
        },
        employerContactNumber: {
          type: 'string'
        },
        pregnancyStatus: {
          type: 'boolean',
          default: true
        },
        withAllergy: {
          type: 'boolean'
        },
        allergy: {
          type: 'string'
        },
        withComorbidities: {
          type: 'boolean'
        },
        comorbidity: {
          type: 'string',
          enum: [
            '01 - Hypertension',
            '02 - Heart Disease',
            '03 - Kidney Disease',
            '04 - Diabetes Mellitus',
            '05 - Bronchial Asthma',
            '06 - Immunodeficiency State',
            '07 - Cancer',
            '08 - Others'
          ]
        },
        covidHistory: {
          type: 'boolean'
        },
        covidDate: {
          type: 'string',
          // format: 'date'
        },
        covidClassification: {
          type: 'string',
          enum: [
            '01 - Asymptomatic',
            '02 - Mild',
            '03 - Moderate',
            '04 - Severe',
            '05 - Critical'
          ]
        },
        consentForDataCollection: {
          type: 'string',
          enum: ['01 - Yes', '02 - No', '03 - Unknown']
        },
        consentForVaccination: {
          type: 'string',
          enum: ['01 - Yes', '02 - No', '03 - Unknown']
        },
        isPUI: {
          type: 'boolean'
        },
        isPUM: {
          type: 'boolean'
        },
        isVaccineReady: {
          type: 'string'
        },
        isVaccinated: {
          type: 'boolean'
        },
        vaccineManufacturer: {
          type: 'string'
        }
      }
    }
  }
}
