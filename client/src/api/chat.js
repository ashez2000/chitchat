import { api } from './axios'

export const getMessages = async (userId) => {
  const res = await api.get(`/api/chats/${userId}`)
  return res.data
}

export const createMessage = async (content, userId) => {
  const res = await api.post(`/api/chats/${userId}`, { content })
  return res.data
}
