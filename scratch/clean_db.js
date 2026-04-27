const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  await prisma.property.deleteMany();
  await prisma.journalArticle.deleteMany();
  await prisma.teamMember.deleteMany();
  console.log("Database cleared.");
}

clean();
