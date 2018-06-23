
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
 * Vue JS Filters
 */
import './filters/filters';

/**
 * Vue Components
 */
import './components/components';

/**
 * Router an Vuex
 */
import { router } from './routes/router';
import { store } from './store/store';
import { i18n } from './lang/i18n';

/**
 * Master App
 */
import App from './components/App';

import { mapActions, mapGetters } from 'vuex';

export const bus = new Vue();

const app = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    created() {
        this.setLanguage(this.langCookie);
    },
    methods: {
        ...mapActions('lang', ['setLanguage'])
    },
    computed: {
        ...mapGetters('lang', ['langCookie'])
    }
});
