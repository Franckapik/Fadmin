import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;

  try {
    const result = await prisma.home.update({
      where: {
        home_id: 1,
      },
      data: data,
    });
    console.log("Admin Home changed", result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while modifying home url video" + err });
  }
};
