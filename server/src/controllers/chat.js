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

export async function getChats(req, res) {
  const { id: userId } = req.user
  const chats = await db.chatUser.findMany({
    where: {
      userId,
    },
  })

  const users = await db.chatUser.findMany({
    where: {
      chatId: {
        in: chats.map((c) => c.chatId),
      },
      userId: {
        not: userId,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  })

  res.status(200).json({ chats: users })
}
