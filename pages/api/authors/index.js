const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const data_author = await prisma.author.findMany();
  res.json(data_author);
}
