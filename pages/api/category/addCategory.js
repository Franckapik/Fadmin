// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const result = await prisma.category.upsert({
      where: {
        category_id: data.category_id || -1,
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
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new category." });
  }
};
