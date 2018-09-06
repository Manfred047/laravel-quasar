import Vue from 'vue';

// Quasar Styles
import "quasar-extras/material-icons";
import "quasar-extras/fontawesome";
import "quasar-extras/mdi";
import "quasar-extras/ionicons";
import "quasar-extras/roboto-font";
import "quasar-extras/animate";
import Quasar, * as All from 'quasar-framework/dist/quasar.mat.esm';
Vue.use(Quasar, {
    components: All,
    directives: All,
    plugins: All,
    animations: All
});

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, {
    inject: false
});

import Vuex from 'vuex';
Vue.use(Vuex);

import Router from 'vue-router';
Vue.use(Router);

import vueLang from 'vue-i18n';
Vue.use(vueLang);

import { master } from './master';
import moment from 'vue-moment';
Vue.use(moment);

const app = {
    install(Vue) {
        Object.defineProperty(
            Vue.prototype,
            '$master',
            {
                value: master
            });
        Object.defineProperty(
            Vue.prototype,
            '$axios',
            {
                value: require('axios')
            });
    }
};
Vue.use(app);