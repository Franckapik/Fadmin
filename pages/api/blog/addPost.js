import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;

  try {
    const result = await prisma.post.upsert({
      where: {
        post_id: data.post_id || -1,
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
    res
      .status(403)
      .json({ err: "Error occured while adding a new post :" + err });
  }
};
