import { master } from '../helpers/master'
import axios from 'axios'

const AuthService = {
  register (form) {
    return axios.post(master.api('register'), form)
  },
  login (form) {
    return axios.post(master.api('oauth/token'), form)
  },
  logout () {
    return axios.post(master.api('oauth/logout'))
  },
  getAuthUser () {
    return axios.get(master.api('oauth/user'))
  }
}

export { AuthService }
