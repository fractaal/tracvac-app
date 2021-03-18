import { api } from './server'
import { store } from './store'

interface UserInfoResponse {
  result: boolean;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt?: any;
  isVaccinated: boolean;
  isVaccineReady: string;
  category: string;
  categoryID: string;
  philHealthID: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  contactNumber: string;
  fullAddress: string;
  province: string;
  municipalityOrCity: string;
  barangay: string;
  sex: string;
  dateOfBirth: string;
  civilStatus: string;
  employed: string;
  profession: string;
  otherProfession: string;
  directCOVID: boolean;
  employerName: string;
  employerLGU: string;
  employerAddress: string;
  employerContactNumber: string;
  pregnancyStatus: boolean;
  withAllergy: boolean;
  allergy: string;
  withComorbidities: boolean;
  comorbidity: string;
  covidHistory: boolean;
  covidDate: string;
  covidClassification: string;
  consentForDataCollection: string;
  consentForVaccination: string;
}

export async function getUserInfo (): Promise<boolean> {
  const response = await (await api.get('/user')).data as unknown as UserInfoResponse

  if (response.result) {
    store.userInfo = Object.assign({}, store.userInfo, response.user)
    return true
  }

  return false
}
