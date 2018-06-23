import { master } from '../../../plugins/master';

const quasarLang = (lang) => {
    switch (lang) {
        case 'en':
            return 'en-us';
        case 'es':
            return 'es';
        default:
            return 'es';
    }
};

const veeLang = (lang) => {
    switch (lang) {
        case 'es':
            return 'es';
        case 'en':
            return 'en';
        default:
            return 'es';
    }
};

const momentLang = (lang) => {
    switch (lang) {
        case 'es':
            return 'es';
        case 'en':
            return 'en-gb';
        default:
            return 'es';
    }
};

const localLang = (lang) => {
    switch (lang) {
        case 'es':
            return 'es';
        case 'en':
            return 'en-gb';
        default:
            return 'es';
    }
};

export default {
    async setLanguage ({commit}, lang) {
        try {
            let qLang = quasarLang(lang);
            import (`quasar-framework/i18n/${qLang}`).then(lang => {
                master.self.$q.i18n.set(lang.default);
            });
            let vLang = veeLang(lang);
            import (`vee-validate/dist/locale/${vLang}`).then(lang => {
                master.self.$validator.localize(vLang, lang);
            });
            import (`../../../lang/locale/${lang}/${lang}`).then(res => {
                master.self.$i18n.setLocaleMessage(localLang(lang), res.default);
                master.self.$i18n.locale = localLang(lang);
            });
            master.self.$moment.locale(momentLang(lang));
            commit('SET_LANGUAGE', lang);
        } catch (e) {
            console.log('lang_error', e);
        }
    }
}