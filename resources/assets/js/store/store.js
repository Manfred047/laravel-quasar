import Vuex from 'vuex'
import auth from './modules/auth/index';
import lang from './modules/lang/index';

const modules = {
    auth,
    lang
};

const store = new Vuex.Store({
    modules
});

export { store };