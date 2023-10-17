import { Router } from 'express'

import { authenticate } from '../middlewares/auth.js'
import * as auth from '../controllers/auth.js'

const router = Router()

router.post('/signup', auth.signup)
router.post('/signin', auth.signin)
router.put('/signout', auth.signout)
router.get('/profile', authenticate, auth.profile)

export default router
