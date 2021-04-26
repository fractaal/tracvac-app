import { api } from './server'
import { store } from './store'
import notify from 'src/api/notify'
import { logout } from 'src/api/auth'
import { Dialog } from 'quasar'
import ChangePasswordDialog from 'components/ChangePasswordDialog.vue'
// import { FormData } from 'src/templates/registrationFormTemplate'

interface UserInfoResponse {
  result: boolean;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  profilePicturePath: string;
  updatedAt?: string;
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
  dosageNumber: number;
}

export async function getUserInfo (): Promise<boolean> {
  try {
    const response = await (await api.get('/user')).data as unknown as UserInfoResponse

    if (response.result) {
      store.userInfo = Object.assign({}, store.userInfo, response.user)
      return true
    }

    return false
  } catch (e) {
    console.warn('User info retrieval failed! Token must be invalid! Logging out...')
    notify.negative('Please log in again.')
    logout(true)
    return false
  }
}

export async function setUserInfo (data: FormData): Promise<boolean> {
  try {
    const response = await api.patch<{message: string, result: boolean}>('/user', data)

    if (response.data.result) {
      await getUserInfo()
      notify.positive('Personal information updated!')
      return true
    } else {
      notify.negative(`Personal information not saved: ${response.data.message}`)
      return false
    }
  } catch (e) {
    notify.negative(`Personal information not saved: ${e}`)
    return false
  }
}

export async function uploadProfilePicture (file: File) {
  const formData = new FormData()

  formData.append('file', file)
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = (await api.post('/upload-profile-picture', formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data
    if (response.result) {
      notify.positive('Profile picture changed!')
      await getUserInfo()
      return true
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      notify.negative(`Profile picture change failed: ${response.message}`)
      return false
    }
  } catch (err) {
    notify.negative(`Profile picture upload failed: ${(err as unknown as Error).message}`)
    return false
  }
}

export function changePassword () {
  try {
    Dialog.create({
      component: ChangePasswordDialog
    }).onOk(async (data: {oldPassword: string; newPassword: string;}) => {
      const response = await api.post<{result: boolean, message: string}>('/changePassword', {
        oldPassword: data.oldPassword, newPassword: data.newPassword
      })

      if (response.data.result) {
        notify.positive('Password changed! Please log in again with the new password.')
        logout(true)
      } else {
        notify.negative(`Password change failed: ${response.data.message}`)
      }
    })
  } catch (err) {
    notify.negative(`Password change failed: ${err}`)
  }
}
