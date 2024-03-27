import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import { db } from '../db/mod.js'

/** Create new user */
export const create = ({ username, password }) => {
  const id = uuid()
  const hash = bcrypt.hashSync(password)

  return db
    .prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)')
    .run(id, username, hash)
}
