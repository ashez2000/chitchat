import { v4 as uuid } from 'uuid'
import { db } from '../db/mod.js'

/** Create new message */
export const create = (content, chatId, userId) => {
  const id = uuid()
  const createdAt = new Date().toUTCString()

  const sql = `
    INSERT INTO messages (id, content, created_at, chat_id, user_id)
    VALUES (?, ?, ?, ?, ?)
  `

  db.prepare(sql).run(id, content, createdAt, chatId, userId)

  return {
    id,
    content,
    createdAt,
    chatId,
    userId,
  }
}

/** Find messages for a chat */
export const find = (chatId) => {
  const sql = `
    SELECT id, content, created_at, chat_id, user_id
    FROM messages
    WHERE chat_id = ?    
  `

  return db.prepare(sql).all(chatId)
}
