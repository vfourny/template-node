import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Création de quelques utilisateurs avec des tâches
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password123', // Utiliser un mot de passe sécurisé dans un cas réel
      todos: {
        create: [
          { title: 'Acheter du pain' },
          { title: 'Faire du sport', completed: true },
        ],
      },
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password456',
      todos: {
        create: [{ title: 'Faire les courses' }, { title: 'Lire un livre' }],
      },
    },
  })

  console.log('Utilisateurs créés :', user1, user2)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
