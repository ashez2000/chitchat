import pg from 'pg'
import * as env from '../env.js'
const { Pool } = pg

export const pool = new Pool({
  connectionString: env.PG_CONN_STRING,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
