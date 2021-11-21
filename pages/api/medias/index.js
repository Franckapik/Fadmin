const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const data_media = await prisma.media.findMany();
  res.json(data_media);
}
