import { createSigner, createVerifier } from 'fast-jwt'
import { JWT_SECRET } from '../config.js'

const signer = createSigner({ key: JWT_SECRET, expiresIn: '7d' })
const verifier = createVerifier({ key: JWT_SECRET })

export const signToken = (id) => {
  return signer({ id })
}

export const verifyToken = (token) => {
  try {
    return verifier(token)
  } catch (err) {
    console.error(err)
    return null
  }
}
