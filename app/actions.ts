import { PrismaClient } from '@prisma/client';
import { seed } from '../prisma/seed';

const prisma = new PrismaClient();

export const createDummyUsers = async () => {
  'use server';
  await seed();
};

export const createNotification = async (formData: FormData) => {
  'use server';
  const userId = Number(formData.get('userId'));
  const message = formData.get('message')?.toString();

  if (userId && message) {
    await prisma.notification.create({
      data: {
        userId,
        message,
      },
    });
  }
};

export const fetchUsers = async () => {
  'use server';
  return await prisma.user.findMany();
};
