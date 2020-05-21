import _ from 'lodash'
import { AuthService } from '../../services/AuthService'

export default {
  setAuthStatus ({ commit }, auth) {
    commit('SET_AUTH_STATUS', auth)
  },
  setUserData ({ commit }, data) {
    commit('SET_USER_DATA', data)
  },
  storeToken ({ commit }, response) {
    commit('STORE_TOKEN', response)
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
  basicLogout ({ commit }, router) {
    commit('FORCE_LOGOUT', router)
  }
}
