import { master } from '../helpers/master'
import axios from 'axios'

const AuthService = {
  async register (form) {
    return axios.post(master.api('register'), form)
  },
  async login (form) {
    return axios.post(master.api('oauth/token'), form)
  },
  async logout () {
    return axios.post(master.api('oauth/logout'))
  },
  async getAuthUser () {
    return axios.get(master.api('oauth/user'))
  }
}

export { AuthService }
