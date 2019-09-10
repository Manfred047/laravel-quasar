import { esWelcome } from './es-welcome'
import { esRegister } from './es-register'
import { esLogin } from './es-login'
import { esErrors } from './es-errors'
import { esPageTitles } from './es-page-titles'

const es = {
  'welcome': esWelcome,
  'register': esRegister,
  'login': esLogin,
  'error': esErrors,
  'page_titles': esPageTitles
}

export { es }

export default es
