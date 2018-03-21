
import Vue from 'vue';

/**
 * Vue JS Plugins (Custom)
 */
import './plugins/plugins';

/**
 * Vue JS Directives
 */
import './directives/directives';

/**
 * Vue Components
 */
import './components/components';

/**
 * Router an Vuex
 */
import { router } from './routes/router';
import { store } from './store/store';

/**
 * Master App
 */
import App from './components/App';

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        this.$master.self = this;
        this.$master._setMomentDefault();
        this.$master._setAxiosDefault();
    }
});
