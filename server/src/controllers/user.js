import * as repo from '../repository/mod.js'

/**
 * Search users
 * @route GET /api/users?search=
 */
export const search = (req, res) => {
  const query = req.query.search ?? ''
  const page = req.query.page ?? 1
  const limit = req.query.limit ?? 10

  const users = repo.user.search(query, req.user.id, page, limit)
  res.status(200).json(users)
}
