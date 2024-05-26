export const USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_online INTEGER DEFAULT 0
  )
`

export const CHATS_TABLE = `
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT NOT NULL PRIMARY KEY,
    user_1 TEXT NOT NULL,
    user_2 TEXT NOT NULL,

    UNIQUE(user_1, user_2)
  )
`

export const MESSGAGES_TABLE = `
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
