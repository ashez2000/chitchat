import 'dotenv/config'

import http from 'node:http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'

import { PORT, MONGO_URI, NODE_ENV } from './config.js'
import { handleSocket } from './socket.js'
import { buildApp } from './app.js'

async function main() {
  const app = buildApp()
  const server = http.createServer(app)

  try {
    // Mongodb connection
    console.log({ MONGO_URI })
    const conn = await mongoose.connect(MONGO_URI)
    console.log('Connected to mongodb:', conn.connection.host)

    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
    })

    handleSocket(io)

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT} (${NODE_ENV})`)
    })
  } catch (err) {
    console.log(err)
    server.close()
    process.exit(1)
  }
}

main()
