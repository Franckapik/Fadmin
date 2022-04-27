import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;

  //issue on auto-increment
  const medias = await prisma.media.findMany();
  const lastId = medias.sort((a, b) => a.media_id - b.media_id)[
    medias.length - 1
  ].media_id;

  data.media_id = data.media_id || lastId + 1;

  try {
    const result = await prisma.media.upsert({
      where: {
        media_id: data.media_id || -1,
      },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
    });
    console.info(
      data.media_id === lastId + 1 ? "Added media" : "Modified media",
      result
    );

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while adding a new media." + err });
  }
};
