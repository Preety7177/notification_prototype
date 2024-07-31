// /app/admin/actions.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotification = async (formData: FormData) => {
  'use server';
  
  const userId = Number(formData.get('userId'));
  const message = formData.get('message') as string | null;

  if (message === null) {
    throw new Error('Message is required');
  }

  await prisma.notification.create({
    data: {
      userId,
      message,
    },
  });
};

export const createDummyUsers = async () => {
  'use server';

  const users = [
    { name: 'Rashmi' },
    { name: 'Preety' },
    { name: 'Sid' },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
};

export const fetchUsers = async () => {
  'use server';
  return await prisma.user.findMany();
};

export const getUserNotificationCount = async (userId: number) => {
  'use server';
  return await prisma.notification.count({
    where: { userId },
  });
};

export const fetchNewNotifications = async (userId: number, seconds: number) => {
  'use server';
  const date = new Date();
  date.setSeconds(date.getSeconds() - seconds);
  return await prisma.notification.findMany({
    where: {
      userId,
      createdAt: {
        gt: date,
      },
    },
  });
};

export const findUser = async (id: number) => {
  'use server';
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}
