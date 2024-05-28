import { setOnline } from './repository/user.js'

export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log(`socket:connected: ${socket.id}`)

    socket.on('join_chat', ({ chatId }) => {
      socket.join(chatId)
    })

    socket.on('online', ({ userId }) => {
      setOnline(userId, 1)
      io.emit('online', { userId })
    })

    socket.on('offline', ({ userId }) => {
      setOnline(userId, 0)
      io.emit('offline', { userId })
    })

    socket.on('chat_message', (chatId, message) => {
      io.to(chatId).emit('chat_message', message)
    })
  })
}
