import { AppError } from '../utils/app-error.js'
import { signToken } from '../utils/jwt.js'
import * as userRepo from '../repository/user.js'

// signup
// route: POST /api/auth/signup
export async function signup(req, res) {
  const { name, username, password } = req.body

  let user = await userRepo.findByUsername(username)
  if (user) {
    throw new AppError('username already exist', 400)
  }

  user = await userRepo.create(name, username, password)
  sendTokenResponse(user, res)
}

// signin
// route: POST /api/auth/signin
export async function signin(req, res) {
  const { username, password } = req.body
  const user = await userRepo.findByCredential(username, password)

  if (!user) {
    throw new AppError('invalid username or password', 400)
  }

  sendTokenResponse(user, res)
}

// signout
// route: POST /api/auth/signout
export async function signout(req, res) {
  res.clearCookie('token')
  res.status(200).json({})
}

// profile
// route: GET /api/auth/profile
export async function profile(req, res) {
  const user = await userRepo.findProfileById(req.user.id)
  if (!user) {
    throw new AppError('user not found', 404)
  }

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
  })
}

// helper func
const sendTokenResponse = (user, res) => {
  const token = signToken(user.id)

  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'strict',
  })

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },

    token,
  })
}
