import db from '../utils/prisma.js'
import { AppError } from '../utils/app-error.js'

export async function findUsers(req, res) {
  const searchTerm = req.query.search
  const users = await db.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerm,
          },
        },
        {
          username: {
            contains: searchTerm,
          },
        },
      ],
    },
  })

  res.status(200).json({ users })
}
