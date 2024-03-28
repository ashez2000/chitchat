import Database from 'better-sqlite3'
import * as schema from './schema.js'

export const db = new Database('dev.db')

export const migrate = () => {
  db.prepare(schema.USER_TABLE).run()
  db.prepare(schema.CHAT_TABLE).run()
  db.prepare(schema.CHAT_USERS_TABLE).run()
  db.prepare(schema.CHAT_USERS_INDEX).run()
  db.prepare(schema.MESSAGE_TABLE).run()

  console.log('Migrations completed')
}
