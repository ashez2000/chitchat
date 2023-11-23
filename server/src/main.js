import http from 'node:http'
import { Server } from 'socket.io'

import envload from './utils/envload.js'
import app from './app.js'

const port = envload('PORT')
const nodeEnv = envload('NODE_ENV')

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})

io.on('connection', socket => {
  console.log(`(socket connection) socketID: ${socket.id}`)

  socket.on('join_chat', ({ chatId }) => {
    socket.join(chatId)
  })

  socket.on('chat_message', (chatId, message) => {
    io.to(chatId).emit('chat_message', message)
  })
})

server.listen(port, () => {
  console.log('(main) Listening on port', port)
  console.log('(main) Mode', nodeEnv)
})
