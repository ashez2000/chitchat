import 'express-async-errors'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { notfound, errorHandler } from './middlewares/error.js'
import auth from './routes/auth.js'
import chat from './routes/chat.js'

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

app.get('/', (req, res) => res.send('Hello world'))
app.use('/api/auth', auth)
app.use('/api/chat', chat)

app.use(notfound)
app.use(errorHandler)

export default app
