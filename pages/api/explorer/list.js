import fs from "fs";
import fsFileTree from "fs-file-tree";
import * as read from "recursive-readdir-async";

export default async function (req, res) {
  return new Promise((resolve, reject) => {
    const dir0 = "./public/medias/";
    read
      .list(dir0, { mode: read.TREE, ignoreFolders: false })
      .then((tree) => {
        res.status(200).json(tree);
        resolve();
      })
      .catch((error) => {
        res.json({ err: "Error occured while listing explorer: " + err });
        res.status(405).end();
        resolve();
      });
  });
}
