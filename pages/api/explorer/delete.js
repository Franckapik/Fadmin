// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import fs from "fs";

import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  return new Promise((resolve) => {
    console.log("Delete directory " + req.body.folderpath);
    let nodes = req.body.folderpath.split("/");
    const dir = "./public" + req.body.folderpath;

    function removeFolder(location, next) {
      fs.readdir(location, function (err, files) {
        async.each(
          files,
          function (file, cb) {
            file = location + "/" + file;
            fs.stat(file, function (err, stat) {
              if (err) {
                return cb(err);
              }
              if (stat.isDirectory()) {
                removeFolder(file, cb);
              } else {
                fs.unlink(file, function (err) {
                  if (err) {
                    return cb(err);
                  }
                  return cb();
                });
              }
            });
          },
          function (err) {
            if (err) return next(err);
            fs.rmdir(location, function (err) {
              return next(err);
            });
          }
        );
      });
    }

    if (nodes.length > 3) {
      try {
        removeFolder(dir);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("The deleted folder is too high in the tree");
    }
  });
};

// avoir warn API resolved without sending a response for /api/explorer/rename, this may result in stalled requests.
export const config = {
  api: {
    externalResolver: true,
  },
};
