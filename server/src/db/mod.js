import Database from 'better-sqlite3'
import * as schema from './schema.js'

export const db = new Database('dev.db')

export const migrate = () => {
  db.prepare(schema.USERS_TABLE).run()
  db.prepare(schema.CHATS_TABLE).run()
  db.prepare(schema.MESSGAGES_TABLE).run()

  console.log('Migrations completed')
}
