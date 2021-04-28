/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching'

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
  const { title, message } = e.data.json()
  console.log('new data!', title, message)
  displayNotification(title, message)
})
