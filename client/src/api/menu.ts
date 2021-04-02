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
    name: 'Notifications from your LGU',
    description: 'View notifications sent to you from your Local Government Unit.',
    icon: 'fas fa-university',
    action () {
      routerInstance.push('/notifications')
    }
  },
  {
    name: 'Go to the LGU website',
    icon: 'fas fa-globe-americas',
    hidden: false,
    description: 'Connect to your local government\'s website, for local updates',
    action () {
      window.open(addHttp(LocalStorage.getItem('lguUrl') as string), '_system')
    }
  },
  /*
  {
    name: 'Post-vaccine updates',
    description: 'A really lengthy description of post-vaccine updates go here. It\'s super cool!',
    icon: 'fas fa-syringe',
    action () {

    }
  },
  */
  {
    name: 'OTHERS',
    isSeparator: true
  },
  /**
    {
    name: 'Frequently Asked Questions',
    description: 'If you have a question, go to this page and see if they\'re answered here!',
    icon: 'fas fa-question',
    action () {
      routerInstance.push('/faqs')
    }
  },
   */
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
