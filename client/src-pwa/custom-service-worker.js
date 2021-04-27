/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching'
import { LocalStorage } from 'quasar'

precacheAndRoute(
  self.__WB_MANIFEST
)

function displayNotification (title, message) {
  console.log('attempting to show notif ', title, message)
  if (Notification.permission === 'granted') {
    self.registration.showNotification(title, { body: message })
  }
}

self.addEventListener('push', function (e) {
  const data = e.data.json()

  console.log('new data!', data)

  let title
  let message = ''

  if (data.type === 'vaccine') {
    title = 'Your vaccine status was changed!'
  } else if (data.type === 'vaccination') {
    title = 'Your vaccination status was changed!'
  } else if (data.type === 'lgu') {
    title = 'LGU announcement'
    message = data.message
  }

  displayNotification(title, message)
})

self.addEventListener('notificationclick', function (e) {
  window.open(LocalStorage.getItem('server'))
})
