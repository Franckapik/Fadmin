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
    console.info(data.author_id ? "Modified artist" : "Added artist", result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while adding a new author : " + err });
  }
};
