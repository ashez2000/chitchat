import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  chat: {
    type: ObjectId,
    ref: 'Chat',
    required: true,
  },
})

export const Message = mongoose.model('Message', MessageSchema)
