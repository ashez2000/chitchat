import { api } from './axios'

export const signup = async (data) => {
  const res = await api.post('/api/auth/signup', data)
  return res.data
}

export const signin = async (data) => {
  const res = await api.post('/api/auth/signin', data)
  return res.data
}

export const signout = async () => {
  const res = await api.put('/api/auth/signout')
  return res.data
}

export const profile = async () => {
  const res = await api.get('/api/auth/profile')
  return res.data.user
}
