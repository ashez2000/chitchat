import { io } from 'socket.io-client'

const API_URL =
  import.meta.env.MODE === 'production' ? '/' : 'http://localhost:3000'

export const socket = io(API_URL)
