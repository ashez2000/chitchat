import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

import { User } from '../src/model/user.js'
import { Chat } from '../src/model/chat.js'
import { Message } from '../src/model/message.js'

import users from './users.js'

const HASH = bcrypt.hashSync('1234')

async function main() {
  await mongoose.connect(process.env.MONGO_URI)
  await Promise.all([Message.deleteMany(), Chat.deleteMany(), User.deleteMany()])
  await User.create(users.map((u) => ({ username: u, password: HASH })))
  await mongoose.disconnect()
}

main()
