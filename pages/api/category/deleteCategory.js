import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;
  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        category_id: data.id,
      },
    });
    console.info("Deleted category", deleteCategory);
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(403).json({ err: "Error occured while deleting a category." });
  }
};
