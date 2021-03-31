import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import routes from './routes'
import { store } from 'src/api/store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior (to, from, savedPos) {
      if (savedPos) return savedPos; else return { x: 0, y: 0 }
    },
    routes,
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.path === '/' && from.path !== '/') {
      next(false)
    }
    store.activeRoute = to.path
    next()
  })

  return Router
})
