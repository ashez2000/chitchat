import 'dotenv/config'

import http from 'node:http'
import { Server } from 'socket.io'

import { migrate } from './db/mod.js'
import { handleSocket } from './socket.js'
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

  handleSocket(io)

  server.listen(3000, () => {
    console.log('Listening on port', 3000, process.env.NODE_ENV)
  })
}

main()
