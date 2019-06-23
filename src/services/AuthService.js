import { master } from '../helpers/master'
import axios from 'axios'

const AuthService = {
  login (form) {
    return axios.post(master.api('oauth/token'), form)
  },
  logout () {
    return axios.post(master.api('oauth/logout'))
  },
  getAuthUser () {
    return axios.get(master.api('user'))
  }
}

export { AuthService }
