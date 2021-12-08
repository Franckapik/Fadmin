const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const { category_author } = req.query;
  const categories = await prisma.category.findMany({
    where: {
      category_author: Number(category_author),
    },
  });
  res.json(categories);
}
