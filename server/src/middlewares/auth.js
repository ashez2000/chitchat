import { createVerifier } from 'fast-jwt'

import { AppError } from '../utils/app-error.js'
import envload from '../utils/envload.js'

const secret = envload('JWT_SECRET')
const verify = createVerifier({ key: secret })

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
