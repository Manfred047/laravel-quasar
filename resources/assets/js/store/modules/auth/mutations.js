export default {
    SHOW_LOGIN(state, value) {
        state.show_login = value;
    },
    SHOW_REGISTER(state, value) {
        state.show_register = value;
    },
    SET_USER_INFO(state, data) {
        state.data = data;
    },
    RELOAD_AUTH_STATUS(state, func) {
        state.timer = func;
    },
    SET_AUTH_STATUS(state, value) {
        state.auth = value;
    }
}