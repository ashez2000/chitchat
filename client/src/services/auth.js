import axios from 'axios'
import { envLoader } from '../utils/env-loader'

const API_URL = envLoader('VITE_API_URL')

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export const signup = () => {}
export const signin = () => {}
export const signout = () => {}

/** profile :: () -> Promise[User] */
export const getProfile = async () => {
  const res = await api.get('/auth/profile')
  return res.data.user
}
