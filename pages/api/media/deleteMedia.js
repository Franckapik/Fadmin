import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;
  try {
    const deleteMedia = await prisma.media.delete({
      where: {
        media_id: data.id,
      },
    });
    console.info("Deleted media", deleteMedia);
    res.status(200).json(deleteMedia);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while deleting a media." + err });
  }
};
