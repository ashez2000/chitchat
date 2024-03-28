import { api } from './axios'

export const search = async (query = '') => {
  const res = await api.get(`/api/users?search=${query}`)
  return res.data
}
