import { AppError } from '../utils/app-error.js'
import { User } from '../model/user.js'

/**
 * Find user by id
 * @route GET /api/users/{id}
 */
export async function findById(req, res) {
  const user = await User.findById(req.params.id)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.status(200).json({
    id: user._id,
    username: user.username,
    isOnline: user.isOnline,
  })
}

/**
 * Search users
 * @route GET /api/users?search=
 */
export async function search(req, res) {
  const query = req.query.search ?? ''
  const page = req.query.page ?? 1
  const limit = req.query.limit ?? 10
  const curUserId = req.user.id

  const users = await User.find({
    username: {
      $regex: query,
      $options: 'i',
    },
    _id: {
      $ne: curUserId,
    },
  })
    .skip((page - 1) * limit)
    .limit(limit)

  res
    .status(200)
    .json(users.map((u) => ({ id: u._id, username: u.username, isOnline: u.isOnline })))
}
