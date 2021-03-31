import { store } from 'src/api/store'
import { api } from 'src/api/server'
import notify from 'src/api/notify'

export interface Notification {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export async function getNotifications () {
  try {
    const response = await api.get('/notification')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    store.notifications = response.data.notifications
  } catch (e) {
    notify.negative(`An error occurred while trying to get notifications! ${e}`)
  }
}
