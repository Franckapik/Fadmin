import fs from "fs";
import prisma from "../../../prisma/prisma";
import path from "path";

export default async (req, res) => {
  const file = req.body.file;
  const renamed = req.body.renamed;
  const isDir = file.isDirectory;

  const oldFile =
    "." + file.fullname.substring(file.fullname.indexOf("/public/"));
  const newFile =
    "." + file.path.substring(file.path.indexOf("/public/")) + "/" + renamed;

  fs.rename(oldFile, newFile, async function (err) {
    if (err) {
      console.log("Rename error: " + err);
    } else {
      if (!isDir) {
        //file

        console.log(
          "New operation: renaming file " + oldFile + " => " + newFile
        );

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
          });
      } else {
        //folder

        console.log(
          "New operation: renaming folder " + oldFile + " => " + newFile
        );

        const mediasToRename = await prisma.media.findMany({
          where: {
            media_path: {
              contains: oldFile,
            },
          },
        });

        console.log(
          mediasToRename.length
            ? mediasToRename.length + " media(s) finded with folder to rename"
            : "no media folder to rename in the database"
        );

        //create new medias by replacing path
        const newMedias = mediasToRename.map((media) => {
          console.log("Renaming initial file " + media.media_photo);
          return Object.assign({}, media, {
            media_path: media.media_path.replace(oldFile, newFile),
          });
        });

        //update db with new medias

        await Promise.all(
          newMedias.map((newMedia, i) => {
            return prisma.media.updateMany({
              where: {
                media_id: newMedia.media_id,
              },
              data: newMedia,
            });
          })
        ).then((response) => {
          const c = response.reduce((a, b) => ({
            count: a.count + b.count,
          })).count;
          console.log(c + " paths modfied in the db");
          res.status(200).json({ modified: c }); // josn necessaire pour le reload de la vue
        });
      }
    }
  });
};

// avoir warn API resolved without sending a response for /api/explorer/rename, this may result in stalled requests.
export const config = {
  api: {
    externalResolver: true,
  },
};
