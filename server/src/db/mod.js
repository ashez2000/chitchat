import fs from 'node:fs'
import Database from 'better-sqlite3'

export const db = new Database(process.env.DATABASE_URL)

export const migrate = () => {
  const schema = fs.readFileSync('./schema.sql', 'utf-8')
  db.exec(schema)
  console.log('Migration successful')
}
