import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => res.send('Hello world'))

export default app
