/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from './server'
import { getUserInfo, User } from 'src/api/user'
import { routerInstance } from 'boot/router'
import { LocalStorage, Dialog } from 'quasar'
import { FormData } from 'src/templates/registrationFormTemplate'
import { store } from 'src/api/store'

let authed = false

export function isAuthed () { return authed }

export async function login (username: string, password: string): Promise<[boolean, string?]> {
  console.log(`Logging in with ${username} and ${password}...`)

  try {
    const response = await api.post('/login', { username, password })

    if (response.data.result) {
      LocalStorage.set('token', response.data.token)
      api.defaults.headers = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        'X-Access-Token': response.data.token
      }
      await getUserInfo()
      authed = true
      return [true]
    } else {
      authed = false
      return [false, response.data.message as unknown as string]
    }
  } catch (err) {
    authed = false
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return [false, `A clientside error happened while logging you in: ${err}`]
  }
}

export async function loginWithToken (): Promise<boolean> {
  const token = LocalStorage.getItem('token')
  if (token) {
    // Check with the API if the token is actually valid
    api.defaults.headers = {
      'X-Access-Token': token
    }
    const response = await api.get('/is-authorized')
    if (response.data.result === true) {
      await getUserInfo()
      authed = true
      return true
    }
  }
  return false
}

export function logout (force: boolean|undefined) {
  console.log('logout called')

  const logoutProcedure = () => {
    const token = LocalStorage.getItem('token')

    if (token) {
      store.userInfo = Object.assign({}, {}) as User
      LocalStorage.remove('token')
    }

    routerInstance.push('/login')
  }

  if (force) {
    logoutProcedure()
  } else {
    Dialog.create({ message: 'Are you sure you want to log out?', cancel: true, ok: true }).onOk(logoutProcedure)
  }
}

export async function register (formData: FormData): Promise<[boolean, string?]> {
  console.log('Registering...')

  try {
    const response = await api.post('/user', formData)

    if (response.data.result) {
      // Login the user with form data username and password.
      await login(formData.username as string, formData.password as string)
      authed = true
      return [true]
    } else {
      authed = false
      return [false, response.data.message as unknown as string]
    }
  } catch (err) {
    authed = false
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return [false, `A clientside error happened while trying to register you: ${err.message}`]
  }
}
