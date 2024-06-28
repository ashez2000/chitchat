import path from 'node:path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import 'express-async-errors'

import { notfound, errorHandler } from './middlewares/error.js'
import auth from './routes/auth.js'
import chat from './routes/chat.js'
import users from './routes/user.js'

export const buildApp = () => {
  const app = express()

  // global middlewares
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  )
  app.use(cookieParser())

  // api routes
  app.use('/api/auth', auth)
  app.use('/api/chats', chat)
  app.use('/api/users', users)

  // serving react app in production
  if (process.env.NODE_ENV === 'production') {
    const webpath = path.resolve(process.cwd(), '..', 'client', 'dist')
    app.use(express.static(path.join(webpath)))
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(webpath, 'index.html'))
    )
  }

  // global error handlers
  app.use(notfound)
  app.use(errorHandler)

  return app
}
