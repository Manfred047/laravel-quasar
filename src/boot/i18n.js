import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { en } from '../i18n/en/en'
import { configure } from 'vee-validate'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
})

configure({
  defaultMessage: (field, values) => {
    return i18n.t(`validation.${values._rule_}`, values)
  }
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
