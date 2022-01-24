// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export default async (req, res) => {
  return new Promise((resolve) => {
    //rename on server
    fs.rename("./" + req.body.old, "./" + req.body.new, async function (err) {
      if (err) {
        console.log("Rename error: " + err);
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
            resolve();
          }
          if (req.body.type === "folder") {
            //serach for medias with old folder
            const search = await prisma.media.findMany({
              where: {
                media_path: {
                  contains: req.body.old.replace("public", ""),
                },
              },
            });

            //create new medias by replacing path
            const newMedias = search.map((media) => {
              return Object.assign({}, media, {
                media_path: media.media_path.replace(
                  req.body.old.replace("public", ""),
                  req.body.new.replace("public", "")
                ),
              });
            });

            //update db with new medias
            const updateFolders = newMedias.map((newMedia, i) =>
              prisma.media.updateMany({
                where: {
                  media_id: newMedia.media_id,
                },
                data: newMedia,
              })
            );

            Promise.all(updateFolders);

            resolve();
          }
          res.status(200).json({ renamed: req.body.old }); // josn necessaire pour le reload de la vue
        } catch (err) {
          console.log(err);
          res
            .status(403)
            .json({ err: "Error occured while updating a new media." });
          return resolve();
        }
      }
      return resolve();
    });
  });
};

// avoir warn API resolved without sending a response for /api/explorer/rename, this may result in stalled requests.
export const config = {
  api: {
    externalResolver: true,
  },
};
