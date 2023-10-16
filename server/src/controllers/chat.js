import db from '../utils/prisma.js'
import { AppError } from '../utils/app-error.js'

export async function createChat(req, res) {
  const { id: currentUserId } = req.user
  const { userId } = req.body

  const isChat = await db.chat.findFirst({
    where: {
      AND: {
        ChatUser: {
          some: {
            userId: currentUserId,
          },
        },
        ChatUser: {
          some: {
            userId: userId,
          },
        },
      },
    },
  })

  if (isChat) {
    throw new AppError('Chat already exist', 400)
  }

  const chat = await db.chat.create({
    data: {},
  })

  await db.chatUser.create({
    data: {
      chatId: chat.id,
      userId: currentUserId,
    },
  })

  await db.chatUser.create({
    data: {
      chatId: chat.id,
      userId: userId,
    },
  })

  await db.message.create({
    data: {
      content: 'Hi',
      chatId: chat.id,
      userId: currentUserId,
    },
  })

  res.status(200).json({ chat })
}
