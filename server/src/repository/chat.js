import { v4 as uuid } from 'uuid'
import { db } from '../db/mod.js'

/**
 * Create new chat between two users
 * - Returns chatId (string)
 */
export const create = (users) => {
  const id = uuid()

  // Sort is required to avoid duplicate entries for same users
  // Order matters
  users.sort()
  const [user_1, user_2] = users

  const sql = `
    INSERT INTO chats (id, user_1, user_2) VALUES (?, ?, ?)
  `

  db.prepare(sql).run(id, user_1, user_2)

  return id
}

/**
 * Find chat between two users
 * - Returns chatId (string) | undefined
 */
export const find = (users) => {
  const [user_1, user_2] = users.sort()

  const sql = `
    SELECT id FROM chats
    WHERE user_1 = ? AND user_2 = ?
  `

  db.prepare(sql).get(user_1, user_2)?.id
}
