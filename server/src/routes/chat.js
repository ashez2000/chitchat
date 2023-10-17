import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import * as chat from '../controllers/chat.js'

const router = Router()

router.post('/', authenticate, chat.createChat)
router.get('/', authenticate, chat.getChats)
router.get('/:chatId', authenticate, chat.getChatMessages)
router.post('/:chatId/message', authenticate, chat.createChatMessage)

export default router
