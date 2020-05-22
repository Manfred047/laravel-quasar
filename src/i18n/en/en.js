import { enWelcome } from './en-welcome'
import { enRegister } from './en-register'
import { enLogin } from './en-login'
import { enErrors } from './en-errors'
import { enPageTitles } from './en-page-titles'
import { enGeneralForm } from './en-general-form'
import validationMessages from 'vee-validate/dist/locale/en'

const en = {
  welcome: enWelcome,
  register: enRegister,
  login: enLogin,
  error: enErrors,
  page_titles: enPageTitles,
  general_form: enGeneralForm,
  validation: validationMessages.messages
}

export { en }

export default en
