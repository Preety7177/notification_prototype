import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      notifications: {
        create: [
          { message: 'Notification 1 for Alice' },
          { message: 'Notification 2 for Alice' },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      notifications: {
        create: [
          { message: 'Notification 1 for Bob' },
          { message: 'Notification 2 for Bob' },
          { message: 'Notification 3 for Bob' },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Charlie',
      notifications: {
        create: [{ message: 'Notification 1 for Charlie' }],
      },
    },
  });

  console.log({ user1, user2, user3 });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
