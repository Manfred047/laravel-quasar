import { master } from "../../../plugins/master";
export default {
    userInfo(state) {
        return state.data;
    },
    isAuth(state) {
        return state.auth;
    },
    username (state) {
        let u = master.getValue(state.data, ['username']);
        return u || '';
    }
}