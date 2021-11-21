const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const posts = await prisma.author.findMany();
  res.json(posts);
}
