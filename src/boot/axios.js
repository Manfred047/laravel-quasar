import axios from 'axios'
import _ from 'lodash'
import { master } from '../helpers/master'
import { Cookies } from 'quasar'

export default async ({ Vue, route, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  // Global axios defaults
  let token = cookies.get(master.getCookieName())
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
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
    // Do something with response error
    return Promise.reject(error)
  })
  Vue.prototype.$axios = axios
}

export { axios }
