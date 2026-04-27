const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const properties = await prisma.property.findMany();
  console.log("Properties in DB:", properties.map(p => ({ id: p.id, title: p.title })));
}

check();
