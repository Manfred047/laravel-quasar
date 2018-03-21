import Vuex from 'vuex'
import auth from './modules/auth/index';

const modules = {
    auth
};

const store = new Vuex.Store({
    modules
});

export { store };