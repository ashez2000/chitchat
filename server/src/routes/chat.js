import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import * as chat from '../controllers/chat.js'

const router = Router()

router.post('/', authenticate, chat.createChat)

export default router
