import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import * as user from '../controllers/user.js'

const router = Router()

router.get('/', authenticate, user.findUsers)

export default router
