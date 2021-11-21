const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const { id } = req.query;
  const data_author = await prisma.author.findUnique({
    where: {
      author_id: Number(id),
    },
  });
  res.json(data_author);
}
