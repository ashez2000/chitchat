import { Chat } from '../model/chat.js'
import { Message } from '../model/message.js'

/**
 * Get messages between users
 * @route GET /api/chats/:userId
 */
export async function getMessages(req, res) {
  const curUserId = req.user.id
  const userId = req.params.userId

  // If chat doen't exist return empty array
  const chat = await Chat.findOne({ users: { $all: [curUserId, userId] } })
  if (!chat) {
    return res.status(200).json({
      messages: [],
      chatId: null,
    })
  }

  const messages = await Message.find({ chat: chat.id }).sort({ createdAt: 'desc' })

  res.status(200).json({
    messages,
    chatId: chat.id,
  })
}

/**
 * Create new message between two users
 * @route POST /api/chats/:userId
 */
export async function createMessage(req, res) {
  const curUserId = req.user.id
  const userId = req.params.userId
  const content = req.body.content

  // if chat does not exist create new chat between users
  let chat = await Chat.findOne({ users: { $all: [curUserId, userId] } })
  if (!chat) {
    chat = await Chat.create({ users: [curUserId, userId] })
    const message = await Message.create({ content, chat: chat.id, user: curUserId })
    return res.status(201).json(message)
  }

  const message = await Message.create({ content, chat: chat.id, user: curUserId })
  res.status(201).json(message)
}
