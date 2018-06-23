import VueI18n from 'vue-i18n';
import es from './locale/es/es';

export const i18n = new VueI18n({
    locale: 'es',
    fallbackLocale: 'es',
    messages: {
        es
    }
});