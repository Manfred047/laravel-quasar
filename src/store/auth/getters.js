import _ from 'lodash'
export default {
  isAuth (state) {
    return _.get(state, ['is_auth'], false)
  },
  username (state) {
    return _.get(state, ['user_data', 'username'], '')
  },
  email (state) {
    return _.get(state, ['user_data', 'email'], '')
  },
  userData (state) {
    return _.get(state, ['user_data'], {})
  }
}
