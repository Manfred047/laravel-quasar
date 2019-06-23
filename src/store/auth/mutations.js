import { Cookies } from 'quasar'
import { master } from '../../helpers/master'
import axios from 'axios'
import _ from 'lodash'
export default {
  SET_AUTH_STATUS (state, auth) {
    if (!auth) {
      Cookies.remove('oauth')
    }
    state.is_auth = Boolean(auth)
  },
  SET_USER_DATA (state, data) {
    state.data = data
  },
  FORCE_LOGOUT (state, router) {
    delete axios.defaults.headers.common['Authorization']
    Cookies.remove(master.getCookieName())
    state.is_auth = false
    state.data = null
    router.replace({ name: 'auth.login' })
  },
  SET_AUTH_COOKIE (state, data) {
    let token = _.get(data, ['data', 'access_token'])
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    Cookies.set(
      master.getCookieName(),
      token,
      {
        expires: _.get(data, ['data', 'expires_in']) / 60
        // domain: env('COOKIE_DOMAIN'),
        // secure: env('COOKIE_SECURE')
      })
  }
}
