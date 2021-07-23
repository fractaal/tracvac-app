/* eslint-disable @typescript-eslint/unbound-method */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { boot } from 'quasar/wrappers';
import store from '../api/store';
import path from 'path'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  axios.defaults.validateStatus = (status) => {
    return status < 500;
  }

  let subpath: string

  if (process.env.DEV) {
    subpath = '/correctHorseBatteryStaple'
  } else {
    subpath = window.location.pathname
  }

  const get = axios.get
  const post = axios.post

  const hook = (method: 'get' | 'post') => {
    return (url: string, config?: AxiosRequestConfig | undefined) => {
      const modifiedUrl = path.join(subpath, url.split('/').slice(url.indexOf('admin')+1).join('/'))
      console.log(modifiedUrl)
      if (method === 'get') {
        return get.call(axios, modifiedUrl, config)
      } else if (method === 'post') {
        return post.call(axios, modifiedUrl, config)
      }
    }

  }

  // @ts-ignore ikwid
  axios.get = hook('get')
  // @ts-ignore ikwid
  axios.post = hook('post')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
  store.axios = axios;
});
