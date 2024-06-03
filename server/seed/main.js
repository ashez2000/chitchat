import fs from 'node:fs'
import bcrypt from 'bcryptjs'
import Database from 'better-sqlite3'
import { v4 as uuid } from 'uuid'
import 'dotenv/config'

import users from './users.js'

const main = () => {
  const db = new Database(process.env.DATABASE_URL)

  // schema migration
  const schema = fs.readFileSync('./schema.sql', 'utf-8')
  db.exec(schema)

  const password = bcrypt.hashSync('123456')
  const stmt = db.prepare(
    'INSERT INTO users (id, username, password) VALUES (?, ?, ?)'
  )

  const insertManyUsers = db.transaction((users) => {
    for (const u of users) {
      const id = uuid()
      stmt.run(id, u, password)
    }
  })

  insertManyUsers(users)
  console.log('Data migrated')
}

main()
