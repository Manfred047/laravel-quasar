import { LocalStorage } from 'quasar'
import { master } from '../../helpers/master'
import axios from 'axios'
import _ from 'lodash'
export default {
  SET_AUTH_STATUS (state, auth) {
    if (!auth) {
      LocalStorage.remove(master.getAuthTokenName())
      LocalStorage.remove(master.getStorageUserDataName())
    }
    state.is_auth = Boolean(auth)
  },
  SET_USER_DATA (state, data) {
    state.user_data = data
    LocalStorage.set(master.getStorageUserDataName(), data)
  },
  FORCE_LOGOUT (state, router) {
    delete axios.defaults.headers.common['Authorization']
    LocalStorage.remove(master.getAuthTokenName())
    LocalStorage.remove(master.getStorageUserDataName())
    state.is_auth = false
    state.user_data = {}
    router.replace({ name: 'public.login' })
  },
  STORE_TOKEN (state, data) {
    let token = _.get(data, ['data', 'access_token'])
    LocalStorage.set(master.getAuthTokenName(), token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}
