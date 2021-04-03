import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'

axios.defaults.validateStatus = (number) => {
  console.log(`Status is ${number < 500}`)
  return number < 500
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios
})
