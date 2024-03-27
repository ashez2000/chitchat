import bcrypt from 'bcryptjs'
import { AppError } from '../utils/app-error.js'
import { signToken } from '../utils/jwt.js'
import * as repo from '../repository/mod.js'

/**
 * Signup new user
 * @route POST /api/auth/signup
 */
export const signup = (req, res) => {
  const { username, password } = req.body
  const user = repo.user.create({ username, password })
  sendTokenResponse(user, res)
}

/**
 * Signin user
 * @route POST /api/auth/signin
 */
export const signin = (req, res) => {
  const { username, password } = req.body

  const user = repo.user.findByUsername(username)
  if (!user) {
    throw new AppError('Invalid username or password', 401)
  }

  // verify password
  const isMatch = bcrypt.compareSync(password, user.password)
  if (!isMatch) {
    throw new AppError('Invalid username or password', 401)
  }

  sendTokenResponse(user, res)
}

/**
 * Signout user
 * @route POST /api/auth/signout
 */
export const signout = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({})
}

/**
 * Get user profile
 * @route GET /api/auth/profile
 */
export const profile = (req, res) => {
  const user = repo.user.findById(req.user.id)
  if (!user) {
    throw new AppError('user not found', 404)
  }

  res.status(200).json({
    id: user.id,
    username: user.username,
  })
}

/** Returns response with jwt cookie and user data */
const sendTokenResponse = (user, res) => {
  const { id, username } = user
  const token = signToken(id)

  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'strict',
  })

  res.status(200).json({
    id,
    username,
  })
}
