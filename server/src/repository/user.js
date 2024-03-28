import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import { db } from '../db/mod.js'

/**
 * Create new user
 * - Returns { id, username }
 */
export const create = ({ username, password }) => {
  const id = uuid()
  const hash = bcrypt.hashSync(password)

  db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)').run(
    id,
    username,
    hash
  )

  return {
    id,
    username,
  }
}

/**
 * Find user by id
 * - Returns { id, username, password } | undefined
 */
export const findById = (id) => {
  return db
    .prepare('SELECT id, username, password FROM users WHERE id = ?')
    .get(id)
}

/**
 * Find user by username
 * - Returns { id, username, password } | undefined
 */
export const findByUsername = (username) => {
  return db
    .prepare('SELECT id, username, password FROM users WHERE username = ?')
    .get(username)
}

/**
 * Search for users by partial matching username
 * without current user
 * - Returns Array<{ id, username }>
 */
export const search = (username, curUserId) => {
  return db
    .prepare('SELECT id, username FROM users WHERE username LIKE ? AND id != ?')
    .all(`%${username}%`, curUserId)
}
