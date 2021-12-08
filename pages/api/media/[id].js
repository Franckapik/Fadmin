const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const { id } = req.query;
  const data_media = await prisma.media.findUnique({
    where: {
      media_id: Number(id) || -1,
    },
  });

  res.json(data_media);
}
