import { PrismaClient } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

let prisma: PrismaClient


if (!global.prisma) {
  global.prisma = new PrismaClient()
}
prisma = global.prisma


export default prisma