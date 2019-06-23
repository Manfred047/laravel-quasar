import _ from 'lodash'
import { AuthService } from '../../services/AuthService'

export default {
  setAuthStatus ({ commit }, auth) {
    commit('SET_AUTH_STATUS', auth)
  },
  setUserData ({ commit }, data) {
    commit('SET_USER_DATA', data)
  },
  getUserData ({ commit }) {
    return AuthService.getAuthUser()
      .then(response => {
        commit('SET_AUTH_STATUS', true)
        commit('SET_USER_DATA', _.get(response, ['data', 'data'], {}))
      }).catch().then()
  },
  logout ({ commit }, router) {
    AuthService.logout()
    commit('FORCE_LOGOUT', router)
  },
  storeAuthCookie ({ commit }, data) {
    commit('SET_AUTH_COOKIE', data)
  }
}
