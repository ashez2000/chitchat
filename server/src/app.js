import 'express-async-errors'

import path from 'node:path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { notfound, errorHandler } from './middlewares/error.js'
import auth from './routes/auth.js'
import chat from './routes/chat.js'
import users from './routes/user.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(cookieParser())

app.use('/api/auth', auth)
app.use('/api/chats', chat)
app.use('/api/users', users)

if (process.env.NODE_ENV === 'production') {
  const webpath = path.resolve(process.cwd(), '..', 'client', 'dist')
  app.use(express.static(path.join(webpath)))
  app.get('*', (req, res) => res.sendFile(path.resolve(webpath, 'index.html')))
}

app.use(notfound)
app.use(errorHandler)

export default app
