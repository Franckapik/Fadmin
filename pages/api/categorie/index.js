const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const categories = await prisma.category.findMany();
  res.json(categories);
}
