import { User } from './model/user.js'

export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log(`socket:connected: ${socket.id}`)

    socket.on('join_chat', ({ chatId }) => {
      socket.join(chatId)
    })

    socket.on('online', async ({ userId }) => {
      await setOnline(userId, 1)
      io.emit('online', { userId })
    })

    socket.on('offline', async ({ userId }) => {
      await setOnline(userId, 0)
      io.emit('offline', { userId })
    })

    socket.on('chat_message', (chatId, message) => {
      io.to(chatId).emit('chat_message', message)
    })
  })
}

async function setOnline(userId, status) {
  await User.findByIdAndUpdate(userId, { isOnline: status })
}
