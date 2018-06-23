import Vue from 'vue';
import { master } from '../plugins/master';

Vue.filter('currency', (value, format) => {
    return master.currency(value, format);
});

Vue.filter('currencyIso', (value, format) => {
    return master.currencyISO(value, format);
});

Vue.filter('numberFormat', (value, data) => {
    return master.ObjectNumberFormat(value, data);
});