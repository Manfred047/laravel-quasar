import { master } from '../../../plugins/master';

export default {
    SET_LANGUAGE(state, lang) {
        master.self.$q.cookies.set('lang', lang, {
            expires: 30,
            path: '/'
        });
        state.language = lang;
    }
}