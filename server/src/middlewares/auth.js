import { createVerifier } from 'fast-jwt'

import { JWT_SECRET } from '../config.js'
import { AppError } from '../utils/app-error.js'

const verify = createVerifier({ key: JWT_SECRET })

export function authenticate(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    throw new AppError('Unauthorized', 401)
  }

  try {
    const payload = verify(token)
    req.user = payload
    next()
  } catch (err) {
    throw new AppError('Unauthorized', 401)
  }
}
