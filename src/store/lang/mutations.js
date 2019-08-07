import { Cookies } from 'quasar'
import { master } from '../../helpers/master'
import axios from 'axios'

export default {
  SET_LANGUAGE (state, lang) {
    Cookies.set(master.getLangCookieName(), lang)
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    state.language = lang
  }
}
