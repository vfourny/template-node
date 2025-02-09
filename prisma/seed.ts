import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password123',
      todos: {
        create: [
          { title: 'Acheter du pain' },
          { title: 'Faire du sport', completed: true },
        ],
      },
    },
  })

  await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password456',
      todos: {
        create: [{ title: 'Faire les courses' }, { title: 'Lire un livre' }],
      },
    },
  })
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
