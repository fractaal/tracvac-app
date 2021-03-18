/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from './server'
import { routerInstance } from '../boot/router'
import { LocalStorage, Dialog } from 'quasar'

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
      authed = true
      return [true]
    } else {
      authed = false
      return [false, response.data.message as unknown as string]
    }
  } catch (err) {
    authed = false
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
      authed = true
      return true
    }
  }
  return false
}

export function logout () {
  console.log('logout called')
  Dialog.create({
    message: 'Are you sure you want to log out?',
    cancel: true,
    ok: true
  }).onOk(() => {
    const token = LocalStorage.getItem('token')

    if (token) {
      LocalStorage.remove('token')
    }

    routerInstance.push('/login')
  })
}

export async function register (formData: Record<string, any>): Promise<[boolean, string?]> {
  console.log('Registering...')

  try {
    const response = await api.post('/user', formData)

    if (response.data.result) {
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
