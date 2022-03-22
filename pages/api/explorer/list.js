import fs from "fs";
import fsFileTree from "fs-file-tree";
import * as read from "recursive-readdir-async";

export default async (req, res) => {
  try {
    const dir0 = "./public/medias/";
    /* fsFileTree(dir0, (err, tree) => {
       res.status(200).json(tree);
    }); */

    read.list(dir0, { mode: read.TREE }).then(function (tree) {
      res.status(200).json(tree);
    });
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while listing explorer: " + err });
  }
};
