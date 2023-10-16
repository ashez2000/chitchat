import http from 'node:http'
import envload from './utils/envload.js'
import app from './app.js'

const port = envload('PORT')
const nodeEnv = envload('NODE_ENV')

const server = http.createServer(app)
server.listen(port, () => {
  console.log('(main) Listening on port', port)
  console.log('(main) Mode', nodeEnv)
})
