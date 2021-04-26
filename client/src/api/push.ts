import { store } from 'src/api/store'
import { api } from 'src/api/server'
import { LocalStorage, Dialog } from 'quasar'
import convertVapidKey from 'convert-vapid-public-key'

export async function initialize () {
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()

    if (sub === null && !LocalStorage.getItem('initialNotificationPromptShown')) {
      LocalStorage.set('initialNotificationPromptShown', true)
      Dialog.create({
        title: 'Enable notifications?',
        message: "By enabling notifications, we'll be able to inform you of important updates without having Tracvac open."
      }).onOk(() => {
        store.showNotifications = true
        subscribe()
      })
    } else if (sub !== null) {
      store.showNotifications = true
      saveSubscriptionToServer(sub as unknown as PushSubscription)
    } else {
      store.showNotifications = false
    }
  }
}

export async function subscribe () {
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.ready
    try {
      const applicationServerKeyString: string = (await (await api.get('/getVAPIDPublicKey')).data).publicKey
      console.log(applicationServerKeyString)
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKeyString
      })
      console.log('Endpoint URL: ', sub.endpoint)
      saveSubscriptionToServer(sub)
    } catch (err) {
      if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied')
      } else {
        console.error('Unable to subscribe to push', err)
      }
      store.showNotifications = false
    }
  }
}

export async function saveSubscriptionToServer (subscriptionObject: PushSubscription) {
  console.log('Saving subscription to server!')
  await api.post('/saveSubscription', subscriptionObject)
}
