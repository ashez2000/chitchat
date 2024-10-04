import { User } from '../model/user.js'

/**
 * Search users
 * @route GET /api/users?search=
 */
export async function search(req, res) {
  const query = req.query.search ?? ''
  const page = req.query.page ?? 1
  const limit = req.query.limit ?? 10

  const users = await User.find({
    username: {
      $regex: query,
      $options: 'i',
    },
  })
    .skip((page - 1) * limit)
    .limit(limit)

  res
    .status(200)
    .json(users.map((u) => ({ id: u._id, username: u.username, isOnline: u.isOnline })))
}
