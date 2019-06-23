import _ from 'lodash'
export default {
  isAuth (state) {
    return _.get(state, ['is_auth'], false)
  },
  username (state) {
    return _.get(state, ['user', 'username'], '')
  },
  email (state) {
    return _.get(state, ['user', 'email'], '')
  },
  userData (state) {
    return _.get(state, ['user'], {})
  }
}
