import 'dotenv/config'

import http from 'node:http'
import { Server } from 'socket.io'

import * as env from './config/env.js'
import { handleSocket } from './socket.js'
import { buildApp } from './app.js'

const main = () => {
  const app = buildApp()
  const server = http.createServer(app)

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  })

  handleSocket(io)

  server.listen(env.PORT, () => {
    console.log(`main: Listening on port ${env.PORT} (${env.NODE_ENV})`)
  })
}

main()
