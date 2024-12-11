import 'dotenv/config'

import http from 'node:http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import { Redis } from 'ioredis'
import { createAdapter } from '@socket.io/redis-adapter'

import { PORT, MONGO_URI, REDIS_URL, NODE_ENV } from './config.js'
import { handleSocket } from './socket.js'
import { buildApp } from './app.js'
import logger from './logger.js'

async function main() {
  const app = buildApp()
  const server = http.createServer(app)

  const port = process.argv[2] ?? PORT ?? 3000

  try {
    // Mongodb connection
    const conn = await mongoose.connect(MONGO_URI)
    logger.info(`Connected to mongodb: ${conn.connection.host}`)

    // Redis
    const pubClient = new Redis(REDIS_URL).on('error', (e) => logger.error(e))
    const subClient = pubClient.duplicate().on('error', (e) => logger.error(e))

    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
      adapter: createAdapter(pubClient, subClient),
    })

    handleSocket(io)

    server.listen(port, () => {
      logger.info(`Listening on port: ${port} (${NODE_ENV})`)
    })
  } catch (err) {
    console.log(err)
    server.close()
    process.exit(1)
  }
}

main()
