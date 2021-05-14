import axios from 'axios'
import notify from 'src/api/notify'
import { store } from 'src/api/store'
import { Dialog, LocalStorage } from 'quasar'
import { logout } from 'src/api/auth'
import { routerInstance } from 'boot/router'
import { menuLayout } from 'src/api/menu'

export const api = axios.create({
  timeout: 60000,
  baseURL: '',
  validateStatus (status) {
    return status < 500
  }
})

export let server: string

export function addHttp (url: string, secure?: boolean) {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    url = (secure ? 'https://' : 'http://') + url
  }
  return url
}

export async function recept (address: string): Promise<boolean> {
  try {
    // If app is in pwa mode, use https (because it won't work otherwise - if not, use http only)
    address = process.env.MODE === 'pwa' ? addHttp(address.trim(), true) : addHttp(address.trim())
    const response = await api.get(address + '/reception')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (response.data?.version) {
      console.log('reception', response.data)
      for (const key in response.data) {
        LocalStorage.set(key, response.data[key])
        store.serverInfo = Object.assign({}, store.serverInfo, response.data)
      }
      store.serverInfo = Object.assign({}, store.serverInfo, { address })
      notify.positive(`Connected to ${response.data.name}!`)
      LocalStorage.set('server', address)
      api.defaults.baseURL = address
      server = address

      // Show / hide LGU URL button depending on whether or not websiteUrl is present
      if (!(response.data.websiteUrl)) {
        for (let i = 0; i < menuLayout.length; i++) {
          if (menuLayout[i].name === 'Go to the LGU website') {
            menuLayout[i].hidden = true
          }
        }
      }
      return true
    } else {
      notify.negative(`${address} doesn't seem to be a valid Tracvac site.`)
      return false
    }
  } catch (err) {
    notify.negative(`An error happened while connecting ${(err as unknown as Error).message}`)
    return false
  }
}

export async function disconnect () {
  Dialog.create({
    title: `Disconnect from ${store.serverInfo.location}?`,
    message: 'By disconnecting, you\'ll be logged out and taken back to the site selection screen.',
    ok: true,
    cancel: true
  }).onOk(() => {
    logout(true)
    routerInstance.push('/connect')
  })
}
