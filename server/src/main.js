import http from 'node:http'

import { migrate } from './db/mod.js'
import app from './app.js'

const main = () => {
  migrate()

  const server = http.createServer(app)
  server.listen(3000, () => {
    console.log('Listening on port', 3000)
  })
}

main()
