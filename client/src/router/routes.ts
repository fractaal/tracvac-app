import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Splash.vue') },
      { path: '/login', component: () => import('src/pages/Login.vue') },
      { path: '/register', component: () => import('src/pages/Register.vue'), props: { mode: 'register' } },
      { path: '/connect', component: () => import('src/pages/Connect.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/personal-info', component: () => import('pages/Register.vue'), props: { mode: 'edit' } },
      { path: '/logs', component: () => import('src/pages/Logs.vue') },
      { path: '/vaccine', component: () => import('pages/VaccineStatus.vue') },
      { path: '/view-log', component: () => import('pages/ViewLog.vue') },
      { path: '/notifications', component: () => import('pages/Notifications.vue') },
      { path: '/preferences', component: () => import('pages/Preferences.vue') },
      { path: '/faqs', component: () => import('pages/FAQs.vue') },
      { path: '/change-profile-picture', component: () => import('pages/ChangeProfilePicture.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
