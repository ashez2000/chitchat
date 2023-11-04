import axios from 'axios'
import { envLoader } from '../utils/env-loader'

const API_URL = envLoader('VITE_API_URL')

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

/** signup :: SignupData -> Promise[User] */
export const signup = async (data) => {
  const res = await api.post('/auth/signup', data)
  return res.data.user
}

/** signin :: SigninData -> Promise[User] */
export const signin = async (data) => {
  const res = await api.post('/auth/signin', data)
  return res.data.user
}

/** signout :: () -> Promise[] */
export const signout = async () => {
  await api.put('/auth/signout')
}

/** getProfile :: () -> Promise[User] */
export const getProfile = async () => {
  const res = await api.get('/auth/profile')
  return res.data.user
}
