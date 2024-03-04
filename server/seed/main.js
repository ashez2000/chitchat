import { PrismaClient } from '@prisma/client'
import argon from 'argon2'

const db = new PrismaClient()

const users = [
  { name: 'John Doe', username: 'john' },
  { name: 'Tom Langosh', username: 'tom' },
  { name: 'Alexys Schumm', username: 'alexys' },
  { name: 'Myrtice Lebsack', username: 'myrtice' },
  { name: 'Lelia Turner', username: 'lelia' },
  { name: 'Jovany Goodwin', username: 'jovany' },
  { name: 'Vanessa Deckow', username: 'vanessa' },
  { name: 'Janelle Renner', username: 'janelle' },
  { name: 'Kevin Lubowitz', username: 'kevin' },
  { name: 'Loy Howell', username: 'loy' },
  { name: 'Tad Bogisich', username: 'tad' },
  { name: 'Kelvin Grady', username: 'kelvin' },
  { name: 'Candida Wolff', username: 'candida' },
  { name: 'Hildegard Schroeder', username: 'hildegard' },
  { name: 'Lysanne Keeling', username: 'lysanne' },
  { name: 'Meghan Cartwright', username: 'meghan' },
  { name: 'Evangeline Will', username: 'evangeline' },
  { name: 'Orpha Berge', username: 'orpha' },
  { name: 'Rosetta Harvey', username: 'rosetta' },
  { name: 'Fidel Emmerich', username: 'fidel' },
  { name: 'Taurean Crona', username: 'taurean' },
]

const main = async () => {
  await db.user.deleteMany()

  const password = await argon.hash('123456')

  const usersPromises = users.map((u) =>
    db.user.create({
      data: {
        name: u.name,
        username: u.username,
        password,
      },
    })
  )

  await Promise.all(usersPromises)

  console.log('Database seeded')
}

main()
