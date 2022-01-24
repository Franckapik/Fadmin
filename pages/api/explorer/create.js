// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export default async (req, res) => {
  return new Promise((resolve) => {
    console.log("Create directory inside " + req.body.folderpath);
    let nodes = req.body.folderpath.split("/");
    const dir = "./public" + req.body.folderpath + "/" + "new folder";

    //rename on server

    if (nodes.length > 3) {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("The created folder is too high in the tree");
    }
  });
};

// avoir warn API resolved without sending a response for /api/explorer/rename, this may result in stalled requests.
export const config = {
  api: {
    externalResolver: true,
  },
};