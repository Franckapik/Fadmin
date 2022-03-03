import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;

  try {
    const result = await prisma.home.update({
      where: {
        home_id: 1,
      },
      data: {
        home_video_url: data.home_video_url,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res
      .status(403)
      .json({ err: "Error occured while modifying home url video" + err });
  }
};
