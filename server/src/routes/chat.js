import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import * as chat from '../controllers/chat.js'

const router = Router()

router.get('/:userId', authenticate, chat.getMessages)
router.post('/:userId', authenticate, chat.createMessage)

export default router
