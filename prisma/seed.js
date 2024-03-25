const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedDb = async () => {};

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
