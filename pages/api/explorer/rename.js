// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export default async (req, res) => {
  //rename on server
  fs.rename("./" + req.body.old, "./" + req.body.new, async function (err) {
    if (err) {
      console.log("ERROR: " + err);
    } else {
      try {
        if (req.body.type === "file") {
          const result = await prisma.media.updateMany({
            where: {
              media_path: req.body.old.replace("public", ""),
            },
            data: {
              media_path: req.body.new.replace("public", ""),
            },
          });
        }
      } catch (err) {
        console.log(err);
        res
          .status(403)
          .json({ err: "Error occured while updating a new media." });
      }
    }
  });

  /*   const data = req.body;
  try {
    const deleteMedia = await prisma.media.delete({
      where: {
        media_id: data.id,
      },
    });
    res.status(200).json(deleteMedia);
  } catch (err) {
    res.status(403).json({ err: "Error occured while deleting a media." });
  } */
};
