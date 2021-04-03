import { LocalStorage } from 'quasar'
import { store } from 'src/api/store'
import { getNotifications, Notification } from 'src/api/notification'

export default async function startup () {
  // Keep track of notifications we've already known about
  // If something new pops up, display the new badge
  let alreadyRead: number[] = LocalStorage.getItem('alreadyRead') as number[]
  if (alreadyRead === null) LocalStorage.set('alreadyRead', [])
  alreadyRead = LocalStorage.getItem('alreadyRead') as number[]

  const [notifs] = await getNotifications(0)

  for (const notif of notifs as Notification[]) {
    if ((alreadyRead?.indexOf(notif.id)) === -1) {
      for (const menuItem of store.menu) {
        if (menuItem.name === 'Notifications from your LGU') {
          menuItem.showBadge = true
        }
      }
      alreadyRead.push(notif.id)
    }
  }
  LocalStorage.set('alreadyRead', alreadyRead)

  // Check if the vaccination status or vaccine status have changed
  const lastIsVaccinated = LocalStorage.getItem('lastIsVaccinated')
  const lastIsVaccineReady = LocalStorage.getItem('lastIsVaccineReady')

  if (lastIsVaccinated !== null || lastIsVaccineReady !== null) {
    const currentIsVaccinated = !!store.userInfo!.isVaccinated
    const currentIsVaccineReady = store.userInfo!.isVaccineReady

    if (currentIsVaccinated !== lastIsVaccinated) {
      store.changeInVaccinationStatus = true
    }

    if (currentIsVaccineReady !== lastIsVaccineReady) {
      store.changeInVaccineStatus = true
    }

    LocalStorage.set('lastIsVaccinated', currentIsVaccinated)
    LocalStorage.set('lastIsVaccineReady', currentIsVaccineReady)
  } else {
    LocalStorage.set('lastIsVaccinated', !!store.userInfo!.isVaccinated)
    LocalStorage.set('lastIsVaccineReady', store.userInfo!.isVaccineReady)
  }
}
