import axios from 'axios'
import _ from 'lodash'
import { master } from '../helpers/master'
import { Cookies, LocalStorage, Notify } from 'quasar'

export default async ({ Vue, app, ssrContext, store, router }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  // Global axios defaults
  let token = LocalStorage.getItem(master.getAuthTokenName())
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['lang'] = cookies.get(master.getLangCookieName())
  if (!_.isEmpty(token)) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  // Add a request interceptor
  axios.interceptors.request.use((config) => {
    // Do something before request is sent
    return config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })
  // Add a response interceptor
  axios.interceptors.response.use((response) => {
    // Do something with response data
    return response
  }, (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 422:
          // form error
          break

        case 404:
          Notify.create({
            message: app.i18n.t('error.e404'),
            type: 'negative'
          })
          break

        case 405:
          Notify.create({
            message: app.i18n.t('error.e405'),
            type: 'negative'
          })
          break

        case 403:
          Notify.create({
            message: app.i18n.t('error.e403'),
            type: 'negative'
          })
          break

        case 419:
          Notify.create({
            message: app.i18n.t('error.e419'),
            type: 'negative'
          })
          break

        case 500:
          Notify.create({
            message: app.i18n.t('error.e500'),
            type: 'negative'
          })
          break

        case 401:
          if (_.get(error, ['response', 'data', 'message'], '') === 'Unauthenticated.') {
            Notify.create({
              message: app.i18n.t('error.eSessionExpired'),
              type: 'warning'
            })
            store.dispatch('auth/basicLogout', router)
          }
          break

        default:
          Notify.create({
            message: app.i18n.t('error.eUnexpected'),
            type: 'negative'
          })
          break
      }
    } else {
      Notify.create({
        message: app.i18n.t('error.eUnexpected'),
        type: 'negative'
      })
    }
    // Do something with response error
    return Promise.reject(error)
  })
  Vue.prototype.$axios = axios
}

export { axios }
