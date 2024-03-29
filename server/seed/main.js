import 'dotenv/config'

import bcrypt from 'bcryptjs'
import Database from 'better-sqlite3'
import { v4 as uuid } from 'uuid'

const db = new Database(process.env.DATABASE_URL)

const users = ['john', 'tom', 'kevin', 'loy', 'tad', 'kelvin', 'james', 'aswin']

const main = async () => {
  const password = bcrypt.hashSync('123456')

  const sql = db.prepare(
    'INSERT INTO users (id, username, password) VALUES (?, ?, ?)'
  )

  const insertManyUsers = db.transaction((users) => {
    for (const u of users) {
      const id = uuid()
      sql.run(id, u, password)
    }
  })

  insertManyUsers(users)
}

main()
