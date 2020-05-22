import { esWelcome } from './es-welcome'
import { esRegister } from './es-register'
import { esLogin } from './es-login'
import { esErrors } from './es-errors'
import { esPageTitles } from './es-page-titles'
import { esGeneralForm } from './es-general-form'
import validationMessages from 'vee-validate/dist/locale/es'

const es = {
  welcome: esWelcome,
  register: esRegister,
  login: esLogin,
  error: esErrors,
  page_titles: esPageTitles,
  general_form: esGeneralForm,
  validation: validationMessages.messages
}

export { es }

export default es
