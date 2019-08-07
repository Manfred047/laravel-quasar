import { esWelcome } from './es-welcome'
import { esRegister } from './es-register'
import { esLogin } from './es-login'
import { esErrors } from './es-errors'

const es = {
  'welcome': esWelcome,
  'register': esRegister,
  'login': esLogin,
  'error': esErrors
}

export { es }

export default es
