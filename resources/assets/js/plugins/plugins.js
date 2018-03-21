import Vue from 'vue';

import Quasar, * as All from 'quasar-framework/dist/quasar.mat.esm.js';
Vue.use(Quasar, {
    components: All,
    directives: All,
    plugins: All,
    animations: All
});
// Stilos de Quasar
//import "quasar-extras/material-icons/material-icons.css";
import "quasar-extras/roboto-font";
import "quasar-extras/animate";

import VeeValidate, { Validator } from 'vee-validate';
import VeeValidateLocale from 'vee-validate/dist/locale/es';
Validator.localize('es', VeeValidateLocale);
Vue.use(VeeValidate);

import Vuex from 'vuex';
Vue.use(Vuex);

import Router from 'vue-router';
Vue.use(Router);

import vueLang from 'vue-i18n';
Vue.use(vueLang);

import { master } from './master';
import moment from 'moment';
import axios from 'axios';

const plugins = {
    install(Vue) {
        Object.defineProperty(
            Vue.prototype,
            '$master',
            {
                value: master
            });
        Object.defineProperty(
            Vue.prototype,
            '$moment',
            {
                value: moment
            });
        Object.defineProperty(
            Vue.prototype,
            '$axios',
            {
                value: axios
            });
    }
};
Vue.use(plugins);