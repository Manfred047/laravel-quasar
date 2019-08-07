import { Quasar } from 'quasar'
import VeeValidate from 'vee-validate'
import moment from 'moment'
// Lang for quasar
const qLang = lang => {
  switch (lang) {
    case 'en':
      return 'en-us'
    case 'es':
      return lang
    default:
      return 'en-us'
  }
}

// Lang for veevalidate
const veeLang = lang => {
  switch (lang) {
    case 'es':
      return 'es'
    case 'en':
      return 'en'
    default:
      return 'en'
  }
}

// Lang for moment
const momentLang = lang => {
  switch (lang) {
    case 'es':
      return 'es'
    case 'en':
      return 'en-gb'
    default:
      return 'en'
  }
}

// Lang for local files
const localLang = lang => {
  switch (lang) {
    case 'es':
      return 'es'
    case 'en':
      return 'en'
    default:
      return 'en'
  }
}

export default {
  async setLanguage ({ commit }, lang) {
    try {
      await import(`quasar/lang/${qLang(lang)}`)
        .then(language => {
          Quasar.lang.set(language.default)
        })
      await import(`vee-validate/dist/locale/${veeLang(lang)}`)
        .then(language => {
          VeeValidate.configure({
            locale: veeLang(lang),
            dictionary: language
          })
        })
      let localL = localLang(lang)
      await import(`../../i18n/${localL}/${localL}`)
      moment.locale(momentLang(lang))
    } catch (e) {
      console.log(e)
    }
  }
}
