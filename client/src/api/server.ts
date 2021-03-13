import axios, { AxiosInstance } from 'axios'
import { Notify } from 'quasar'

export let api: AxiosInstance

function addHttp (url: string) {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    url = 'http://' + url
  }
  return url
}

export async function recept (address: string): Promise<boolean> {
  try {
    address = addHttp(address.trim())
    const possibleApi = axios.create({ baseURL: address, timeout: 5000 })
    const response = await possibleApi.get('/reception')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (response.data?.version) {
      Notify.create({
        type: 'positive',
        message: `Connected to ${address}!`
      })
      api = possibleApi
      return true
    } else {
      Notify.create({
        type: 'negative',
        message: `${address} doesn't seem to be a valid Tracvac site.`
      })
      return false
    }
  } catch (err) {
    Notify.create({
      type: 'negative',
      message: `An error happened while connecting: ${(err as unknown as Error).message}`
    })
    return false
  }
}
