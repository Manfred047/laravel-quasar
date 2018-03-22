import { master } from '../../../plugins/master';

const auth = (state) => {
    master.self.$axios({
        method: 'get',
        url: master.api('/oauth/check')
    }).then((response) => {
        state.auth = Boolean(response.data.auth);
    }).catch((error) => {
        state.auth = false;
    });
};
export default {
    SHOW_LOGIN(state, value) {
        state.show_login = value;
    },
    SHOW_REGISTER(state, value) {
        state.show_register = value;
    },
    SET_USER_INFO(state) {
        master.self.$axios({
            method: 'get',
            url: master.api('/user')
        }).then((response) => {
            state.user = response.data.data;
        });
    },
    GET_AUTH_STATUS(state) {
        auth(state);
        state.timer = new master.Timer(() => {
            auth(state);
        }, 300000);// 5 mns
    },
    RELOAD_AUTH_STATUS(state) {
        state.timer.reset(300000);
    },
    SET_AUTH_STATUS(state, value) {
        state.auth = Boolean(value);
    },
    LOGOUT(state) {
        master.self.$axios({
            method: 'post',
            url: master.api('/oauth/logout')
        }).then((response) => {
            state.auth = false;
            state.timer.reset(300000);
            master.self.$q.notify({
                message: 'Success logout',
                type: 'positive'
            });
        });
    }
}