import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;

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
    console.info(
      data.category_id ? "Modified category" : "Added category",
      result
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while adding a new category: " + err });
  }
};
