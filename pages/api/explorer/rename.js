import fs from "fs";
import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  return new Promise((resolve) => {
    console.log("Renaming " + req.body.old + " to " + req.body.new);
    let nodes = req.body.old.split("/");

    //rename on server

    if (nodes.length > 3) {
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

              console.log(
                search.length
                  ? search.length + " media(s) finded with folder to rename"
                  : "no media finded with the new folder"
              );

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
    } else {
      console.log("The renamed file/folder is too high in the tree");
    }
  });
};

// avoir warn API resolved without sending a response for /api/explorer/rename, this may result in stalled requests.
export const config = {
  api: {
    externalResolver: true,
  },
};
