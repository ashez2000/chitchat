import fs from 'node:fs'
import pg from 'pg'

import * as env from '../env.js'

const { Pool } = pg

export const pool = new Pool({
  connectionString: env.PG_CONN_STRING,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export async function migrate() {
  const schema = fs.readFileSync('./sql_schemas/pg.schema.sql', 'utf-8')
  await pool.query(schema)
  console.log('migration complete')
}
