import { api } from './axios'

export const search = async (query = '', page = 1, limit = 5) => {
  const res = await api.get(
    `/api/users?search=${query}&page=${page}&limit=${limit}`
  )
  return res.data
}
