import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Splash.vue') },
      { path: '/login', component: () => import('src/pages/Login.vue') },
      { path: '/register', component: () => import('src/pages/Register.vue') },
      { path: '/connect', component: () => import('src/pages/Connect.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/logs', component: () => import('src/pages/Logs.vue') },
      { path: '/vaccine', component: () => import('pages/VaccineStatus.vue') },
      { path: '/view-log', component: () => import('pages/ViewLog.vue') }
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
