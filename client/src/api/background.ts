// import BackgroundFetch from 'cordova-plugin-background-fetch'
// @ts-ignore
import startup from 'src/api/startup'

const BackgroundFetch = window.BackgroundFetch

import { LocalStorage } from 'quasar'
import { api } from 'src/api/server'
import { isAuthed } from 'src/api/auth'
import { getUserInfo, User } from 'src/api/user'

BackgroundFetch.configure({
  minimumFetchInterval: 15,
  requiredNetworkType: 1
}, async (taskId: string) => {
  if (isAuthed()) {
    const response = await api.get<{result: boolean; user: User}>('/user')

    if (response.data.result) {
      const userInfo = response.data.user
      // Check if the vaccination status or vaccine status have changed
      const lastIsVaccinated = LocalStorage.getItem('lastIsVaccinated')
      const lastIsVaccineReady = LocalStorage.getItem('lastIsVaccineReady')

      if (lastIsVaccinated !== null || lastIsVaccineReady !== null) {
        const currentIsVaccinated = !!userInfo.isVaccinated
        const currentIsVaccineReady = userInfo.isVaccineReady

        if (currentIsVaccinated !== lastIsVaccinated) {
          // @ts-ignore
          cordova.plugins.notification.local.schedule({
            title: 'An update!',
            text: 'Your vaccination status was updated!',
            foreground: true
          })
        }

        if (currentIsVaccineReady !== lastIsVaccineReady) {
          // @ts-ignore
          cordova.plugins.notification.local.schedule({
            title: 'An update!',
            text: 'Your vaccine status was updated!',
            foreground: true
          })
        }
      }
    }
  }
  await getUserInfo()
  await startup()
  BackgroundFetch.finish(taskId)
}, (taskId: string) => {
  BackgroundFetch.finish(taskId)
}).then((status: any) => {
  console.log(`background fetch status: ${status}`)
})
