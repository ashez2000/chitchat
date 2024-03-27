import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import { db } from '../db/mod.js'

/**
 * Create new user
 */
export const create = ({ username, password }) => {
  const id = uuid()
  const hash = bcrypt.hashSync(password)

  return db
    .prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)')
    .run(id, username, hash)
}

/**
 * Find user by id
 */
export const findById = (id) => {
  return db
    .prepare('SELECT id, username, password FROM users WHERE id = ?')
    .get(id)
}

/**
 * Find user by username
 */
export const findByUsername = (username) => {
  return db
    .prepare('SELECT id, username, password FROM users WHERE username = ?')
    .get(username)
}

/**
 * Search for users by partial matching username
 */
export const search = (username) => {
  return db
    .prepare('SELECT id, username, password FROM users WHERE username LIKE ?')
    .all(`%${username}%`)
}
