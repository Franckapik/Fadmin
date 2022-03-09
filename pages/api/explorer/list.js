import fs from "fs";
import fsFileTree from "fs-file-tree";

export default async (req, res) => {
  try {
    const dir0 = "./public/medias/";
    fsFileTree(dir0, (err, tree) => {
      console.log(tree);
      res.status(200).json(tree);
    });
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while listing explorer: " + err });
  }
};
