import 'dotenv/config'

import http from 'node:http'
import { Server } from 'socket.io'

import { migrate } from './db/mod.js'
import app from './app.js'

const main = () => {
  migrate()

  const server = http.createServer(app)

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    console.log(`Socket Connected: ${socket.id}`)

    socket.on('join_chat', ({ chatId }) => {
      console.log('Joinde to room', chatId)
      socket.join(chatId)
    })

    socket.on('chat_message', (chatId, message) => {
      console.log('Got message', message)
      console.log('ChatId', chatId)
      io.to(chatId).emit('chat_message', message)
    })
  })

  server.listen(3000, () => {
    console.log('Listening on port', 3000, process.env.NODE_ENV)
  })
}

main()
