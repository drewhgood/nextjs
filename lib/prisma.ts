import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  if (!prisma) {
    prisma = new PrismaClient();
  }
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export { prisma };
