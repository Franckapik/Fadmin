// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;

  try {
    const result = await prisma.author.upsert({
      where: {
        author_id: data.author_id || -1,
      },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ err: "Error occured while adding a new author." });
  }
};
