import { PrismaClient } from '@prisma/client';
import { seed } from '../../prisma/seed';

const prisma = new PrismaClient();

export const createDummyUsers = async () => {
  'use server';
  await seed();
};

export const createNotification = async (userId: number, message: string) => {
  'use server';
  await prisma.notification.create({
    data: {
      userId,
      message,
    },
  });
};
