import { createSigner } from 'fast-jwt'

import db from '../utils/prisma.js'
import envload from '../utils/envload.js'
import { AppError } from '../utils/app-error.js'

const secret = envload('JWT_SECRET')
const signToken = createSigner({ key: secret })

export async function signup(req, res) {
  const { name, username, password } = req.body

  const exist = await db.user.findUnique({ where: { username } })
  if (exist !== null) {
    throw new AppError('username already exist', 400)
  }

  const user = await db.user.create({
    data: {
      name,
      username,
      password,
    },
  })

  const token = signToken(user)
  res.cookie('token', token)
  res.status(201).json({
    user,
    token,
  })
}

export async function signin(req, res) {
  const { username, password } = req.body
  const user = await db.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    throw new AppError('Invalid username or password', 400)
  }

  if (user.password !== password) {
    throw new AppError('Invalid username or password', 400)
  }

  const token = signToken(user)
  res.cookie('token', token)
  res.status(201).json({
    user,
    token,
  })
}

export async function signout(req, res) {
  res.clearCookie('token')
  res.status(200).json({})
}

export async function profile(req, res) {
  res.status(200).json({
    user: req.user,
  })
}
