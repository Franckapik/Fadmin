// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;
  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        category_id: data.id,
      },
    });
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(403).json({ err: "Error occured while deleting a category." });
  }
};
