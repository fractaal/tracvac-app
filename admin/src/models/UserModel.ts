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

export interface User {
  id: number;
  username: string
  password: string
  email: string
  profilePicturePath: string
  isPUI: boolean
  isPUM: boolean
  isVaccinated: boolean
  vaccineManufacturer: string
  isVaccineReady: VaccineReadyStatus
  category: UserCategoryEnum
  categoryID: string
  philHealthID: string
  lastName: string
  firstName: string
  middleName: string
  suffix: string
  contactNumber: string
  fullAddress: string
  province: string
  municipalityOrCity: string
  barangay: string
  sex: UserSexEnum
  dateOfBirth: string
  employed: UserEmployedEnum
  profession: UserProfessionEnum
  otherProfession: string
  directCOVID: boolean
  employerName: string
  employerLGU: string
  employerAddress: string
  employerContactNumber: string
  pregnancyStatus: boolean
  withAllergy: boolean
  allergy: string
  withComorbidities: boolean
  comorbidity: UserComorbidityEnum
  covidHistory: boolean
  covidDate: string
  covidClassification: UserCovidClassificationEnum
  consentForDataCollection: UserConsentForDataCollectionEnum
  consentForVaccination: UserConsentForVaccinationEnum
}
