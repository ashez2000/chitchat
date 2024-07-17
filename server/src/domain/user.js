import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'

export class User {
  constructor(username, password) {
    this.id = uuid()
    this.username = username
    this.password = bcrypt.hashSync(password)
    this.isOnline = 0
  }
}
