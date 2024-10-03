import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const ChatSchema = new mongoose.Schema({
  users: [{ type: ObjectId, ref: 'User' }],
})

export const Chat = mongoose.model('Chat', ChatSchema)
