import { logout } from 'src/api/auth'
import { store } from 'src/api/store'
import router, { routerInstance } from 'boot/router'
import { LocalStorage } from 'quasar'
import { addHttp } from 'src/api/server'

export interface MenuItem {
  name: string;
  isSeparator?: boolean;
  icon?: string;
  disallowRecentlyViewed?: boolean;
  action?: Function;
  hidden?: boolean;
  showBadge?: boolean;
}

export const menuLayout = [
  {
    name: 'BE INFORMED',
    isSeparator: true
  },
  {
    name: 'Notifications from DOH',
    description: 'Go to the Department of Health official website and check their notifications from there.',
    icon: 'health_and_safety',
    action () {
      window.open('https://doh.gov.ph/', '_system')
    }
  },
  {
    name: 'Notifications from Tracvac',
    showBadge: false,
    description: 'View notifications sent to you from this Tracvac site.',
    icon: 'fas fa-university',
    action () {
      routerInstance.push('/notifications')
      for (const menuItem of menuLayout) {
        if (menuItem.name === 'Notifications from your LGU') {
          menuItem.showBadge = false
        }
      }
    }
  },
  {
    name: 'Go to website',
    icon: 'fas fa-globe-americas',
    hidden: false,
    description: 'Connect to the website associated with this Tracvac site.',
    action () {
      window.open(addHttp(LocalStorage.getItem('websiteUrl') as string), '_system')
    }
  },
  {
    name: 'OTHERS',
    isSeparator: true
  },
  {
    name: 'Preferences',
    icon: 'fas fa-cog',
    disallowRecentlyViewed: true,
    action () {
      routerInstance.push('/preferences')
    }
  },
  {
    name: 'Log out',
    icon: 'fas fa-sign-out-alt',
    disallowRecentlyViewed: true,
    action: logout
  }
] as MenuItem[]

// Hook into actions for recently viewed functionality
for (const item of menuLayout) {
  if (item.action && !item.disallowRecentlyViewed) {
    const targetAction = item.action
    item.action = (...args: unknown[]) => {
      store.recentlyViewed = Object.assign({}, store.recentlyViewed, item)
      console.log(`Recently viewed is now ${store.recentlyViewed?.name}`)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      targetAction(...args)
    }
  }
}
