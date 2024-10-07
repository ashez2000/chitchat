import { User } from './model/user.js'
import redis from './redis.js'

export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log(`socket:connected: ${socket.id}`)

    socket.on('join_chat', ({ chatId }) => {
      socket.join(chatId)
    })

    socket.on('online', async ({ userId }) => {
      await redis.set(socket.id, userId)
      await setOnline(userId, 1)
      io.emit('online', { userId })
    })

    socket.on('offline', async ({ userId }) => {
      await setOnline(userId, 0)
    })

    socket.on('chat_message', (chatId, message) => {
      io.to(chatId).emit('chat_message', message)
    })

    socket.on('disconnect', async () => {
      console.log(`socket:disconnected: ${socket.id}`)
      const userId = await redis.get(socket.id)
      await redis.del(socket.id)
      io.emit('offline', { userId })
    })
  })
}

async function setOnline(userId, status) {
  await User.findByIdAndUpdate(userId, { isOnline: status })
}
