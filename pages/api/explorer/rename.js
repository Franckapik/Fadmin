import fs from "fs";
import prisma from "../../../prisma/prisma";
import path from "path";

export default async (req, res) => {
  return new Promise((resolve) => {
    const file = req.body.file;
    const renamed = req.body.renamed;
    const isDir = file.isDirectory;

    const oldFile =
      "." + file.fullname.substring(file.fullname.indexOf("/public/"));
    const newFile =
      "." + file.path.substring(file.path.indexOf("/public/")) + "/" + renamed;

    console.log("renaming " + oldFile + " to " + newFile);

    fs.rename(oldFile, newFile, async function (err) {
      if (err) {
        console.log("Rename error: " + err);
      } else {
        try {
          if (!isDir) {
            //file
            await prisma.media
              .updateMany({
                where: {
                  media_path: oldFile,
                },
                data: {
                  media_path: newFile,
                },
              })
              .then((response) => {
                console.log(response.count + " db media(s) modifié(s)");
                resolve();
              });
          } else {
            //folder

            const search = await prisma.media.findMany({
              where: {
                media_path: {
                  contains: oldFile,
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
          res.status(200).json({ renamed: file.name }); // josn necessaire pour le reload de la vue
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
