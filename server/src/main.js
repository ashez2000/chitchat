import { v4 as uuid } from 'uuid'
import * as repo from './repository/mod.js'
import { migrate, db } from './db/mod.js'

migrate()

const res = repo.user.search('')

console.log(res)
