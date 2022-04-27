import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body.items;

  try {
    const result = await prisma.home.update({
      where: {
        home_id: 1,
      },
      data: {
        home_media_position: data.toString(),
      },
    });
    console.info("Media position changed", result.home_media_position);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while changing position media." + err });
  }
};
