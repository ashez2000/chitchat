import argon from 'argon2'
import db from '../utils/prisma.js'

export const create = async (name, username, password) => {
  password = await argon.hash(password)

  const user = db.user.create({
    data: {
      name,
      username,
      password,
    },
  })

  return user
}

export const findByCredential = async (username, password) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return null
  }

  const isMatch = await argon.verify(user.password, password)
  if (!isMatch) {
    return null
  }

  return user
}

export const findByUsername = async (username) => {
  return await db.user.findUnique({
    where: {
      username,
    },
  })
}

export const findProfileById = async (id) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      username: true,
    },
  })
}
