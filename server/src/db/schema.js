export const USER_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`

export const CHAT_TABLE = `
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT NOT NULL PRIMARY KEY
  )
`

export const CHAT_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS chat_users (
    id TEXT NOT NULL PRIMARY KEY,
    chat_id TEXT NOT NULL,
    user_id TEXT NOT NULL,

    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`

export const CHAT_USERS_INDEX = `
  CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_users
  ON chat_users (chat_id, user_id)
`

export const MESSAGE_TABLE = `
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    user_id TEXT NOT NULL,

    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`
