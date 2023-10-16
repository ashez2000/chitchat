import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  await db.user.create({
    data: {
      id: 'clntfb4b50000ukbk8obx8lri',
      name: 'Aswin',
      username: 'aswin',
      password: '123456',
    },
  })

  await db.user.create({
    data: {
      id: 'clntfb4ba0001ukbkwugfwl10',
      name: 'James',
      username: 'james',
      password: '123456',
    },
  })

  await db.$disconnect()
}

main()
