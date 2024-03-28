import { v4 as uuid } from 'uuid'
import { db } from '../db/mod.js'

/** Add user to given chat */
const createChatUser = (chatId, userId) => {
  const id = uuid()

  const sql = `
    INSERT INTO chat_users (id, chat_id, user_id)
    VALUES (?, ?, ?)
  `

  db.prepare(sql).run(id, chatId, userId)
}

/**
 * Create new chat between two users
 */
export const create = (users) => {
  const id = uuid()

  const sql = `
    INSERT INTO chats (id) VALUES (?)
  `

  db.prepare(sql).run(id)

  createChatUser(chatId, users[0])
  createChatUser(chatId, users[1])
}
