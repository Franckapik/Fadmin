import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;

  try {
    const result = await prisma.comment.upsert({
      where: {
        comment_id: data.comment_id || -1,
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
    console.log(data);
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while adding a new comment :" + err });
  }
};
