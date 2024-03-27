import Database from 'better-sqlite3'
import * as schema from './schema.js'

export const db = new Database('dev.db')

export const migrate = () => {
  db.prepare(schema.USER_TABLE).run()
}
