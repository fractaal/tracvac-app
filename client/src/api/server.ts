import axios from 'axios'
import { Notify } from 'quasar'

export const api = axios.create({
  timeout: 5000,
  baseURL: ''
})

export let server: string

function addHttp (url: string) {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    url = 'http://' + url
  }
  return url
}

export async function recept (address: string): Promise<boolean> {
  try {
    address = addHttp(address.trim())
    const response = await api.get(address + '/reception')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (response.data?.version) {
      Notify.create({
        type: 'positive',
        message: `Connected to ${address}!`
      })
      api.defaults.baseURL = address
      server = address
      return true
    } else {
      Notify.create({
        type: 'negative',
        message: `${address} doesn't seem to be a valid Tracvac site.`,
        timeout: 2500,
        position: 'center'
      })
      return false
    }
  } catch (err) {
    Notify.create({
      type: 'negative',
      message: `An error happened while connecting: ${(err as unknown as Error).message}`,
      timeout: 2500,
      position: 'center'
    })
    return false
  }
}
