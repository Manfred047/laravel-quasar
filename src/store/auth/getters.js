import _ from 'lodash'
import { master } from '../../helpers/master'
import { LocalStorage } from 'quasar'
export default {
  isAuth (state) {
    let auth = _.get(state, ['is_auth'], false)
    if (auth) {
      return auth
    }
    if (LocalStorage.has(master.getAuthTokenName())) {
      return true
    }
    return _.get(state, ['is_auth'], false)
  },
  username (state) {
    let username = _.get(state, ['user_data', 'username'])
    if (!username && LocalStorage.has(master.getStorageUserDataName())) {
      return _.get(LocalStorage.getItem(master.getStorageUserDataName()), ['username'], '')
    }
    return username
  },
  email (state) {
    let email = _.get(state, ['user_data', 'email'])
    if (!email && LocalStorage.has(master.getStorageUserDataName())) {
      return _.get(LocalStorage.getItem(master.getStorageUserDataName()), ['email'], '')
    }
    return email
  },
  userData (state) {
    let data = _.get(state, ['user_data', 'email'])
    if (!data && LocalStorage.has(master.getStorageUserDataName())) {
      return LocalStorage.getItem(master.getStorageUserDataName()) || {}
    }
    return data
  }
}
