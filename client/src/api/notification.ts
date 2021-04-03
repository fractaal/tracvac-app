import { store } from 'src/api/store'
import { api } from 'src/api/server'
import notify from 'src/api/notify'
import { LocalStorage } from 'quasar'

export interface Notification {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function resetNotifications () {
  store.notifications = []
}

export async function getNotifications (index: number): Promise<[Notification[]|null, boolean]> {
  try {
    const response = await api.get(`/notification/${index}`)

    const alreadyRead = LocalStorage.getItem('alreadyRead') as number[]
    for (const notif of response.data.notifications.results as Notification[]) {
      if (alreadyRead.indexOf(notif.id) === -1) {
        alreadyRead.push(notif.id)
      }
    }

    LocalStorage.set('alreadyRead', alreadyRead)
    return [response.data.notifications.results as Notification[], response.data.notifications.results.length === 0]
  } catch (e) {
    notify.negative(`An error occurred while trying to get notifications! ${e}`)
    return [null, false]
  }
}
