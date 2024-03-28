import * as repo from '../repository/mod.js'

/**
 * Get messages between users
 * @route GET /api/chats/:userId
 */
export const getMessages = (req, res) => {
  const curUserId = req.user.id
  const userId = req.params.userId

  // If chat doen't exist return empty array
  const chatId = repo.chat.find([curUserId, userId])
  if (!chatId) {
    return res.status(200).json({
      messages: [],
      chatId: null,
    })
  }

  const messages = repo.message.find(chatId)

  res.status(200).json({
    messages,
    chatId,
  })
}

/**
 * Create new message between two users
 * @route POST /api/chats/:userId
 */
export const createMessage = (req, res) => {
  const curUserId = req.user.id
  const userId = req.params.userId
  const content = req.body.content

  const chatId = repo.chat.find([curUserId, userId])
  if (!chatId) {
    const newChatId = repo.chat.create([curUserId, userId])
    const message = repo.message.create(content, newChatId, curUserId)

    return res.status(201).json(message)
  }

  const message = repo.message.create(content, chatId, curUserId)

  res.status(201).json(message)
}
