export default {
    showLogin({commit}, value) {
        commit('SHOW_LOGIN', value);
    },
    showRegister({commit}, value) {
        commit('SHOW_REGISTER', value);
    },
    setUserInfo({commit}) {
        commit('SET_USER_INFO');
    },
    getAuthStatus({commit}) {
        commit('GET_AUTH_STATUS');
    },
    reloadAuthStatus({commit}){
        commit('RELOAD_AUTH_STATUS');
    },
    setAuthStatus({commit}, value) {
        commit('SET_AUTH_STATUS', value);
    },
    logout({commit}) {
        commit('LOGOUT');
    }
}