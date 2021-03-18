import { boot } from 'quasar/wrappers'
import VueRouter from 'vue-router'

let routerInstance = null as unknown as VueRouter

export default boot(({ router }) => {
  routerInstance = router
})

export { routerInstance }
