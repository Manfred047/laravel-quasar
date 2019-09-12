import { Cookies } from 'quasar'
import { master } from '../../helpers/master'
export default {
  getLanguage (state) {
    if (Cookies.has(master.getLangCookieName())) {
      return Cookies.get(master.getLangCookieName())
    }
    return state.language
  },
  languages (state) {
    return state.langList
  }
}
