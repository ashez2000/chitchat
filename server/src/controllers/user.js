import * as repo from '../repository/mod.js'

/**
 * Search users
 * @route GET /api/users?search=
 */
export const search = (req, res) => {
  const query = req.query.search ?? ''
  const users = repo.user.search(query, req.user.id)
  res.status(200).json(users)
}
