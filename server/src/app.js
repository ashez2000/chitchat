import 'express-async-errors'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { notfound, errorHandler } from './middlewares/error.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => res.send('Hello world'))

app.use(notfound)
app.use(errorHandler)

export default app
