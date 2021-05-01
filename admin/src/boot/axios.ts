import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import store from '../api/store';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  axios.defaults.validateStatus = (status) => {
    return status < 500;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
  store.axios = axios;
});
