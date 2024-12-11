import logger from './logger.js'
import { User } from './model/user.js'
import redis from './redis.js'

export function handleSocket(io) {
  io.on('connection', (socket) => {
    logger.info(`socket:connected: ${socket.id}`)

    socket.on('join_chat', ({ chatId }) => {
      socket.join(chatId)
    })

    socket.on('join_notify', ({ userId }) => {
      logger.info(`socket:user ${userId} joining notify`)
      socket.join(`notify:${userId}`)
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

    // TODO: refactor to user sockey instead of room
    socket.on('notify', async (userId, message) => {
      const user = await User.findById(userId)
      // TODO: handle null case
      if (!user) {
        return
      }
      io.to(`notify:${userId}`).emit('notify', user.username, message)
    })

    socket.on('disconnect', (e) => {
      logger.info(e)
    })
  })
}

async function setOnline(userId, status) {
  await User.findByIdAndUpdate(userId, { isOnline: status })
}
