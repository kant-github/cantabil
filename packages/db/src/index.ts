import { PrismaClient } from '@prisma/client';

function prismaClientsingleton() {
    return new PrismaClient();
}

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = globalThis.prisma ?? prismaClientsingleton();
export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}