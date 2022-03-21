//need res.json and catch errors
import fs from "fs";
import path from "path";

export default async (req, res) => {
  return new Promise((resolve) => {
    const oldFile =
      "." + req.body.old.substring(req.body.old.indexOf("/public/"));

    console.log(oldFile);
    const deleteFolderRecursive = function (directoryPath) {
      if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
          const curPath = path.join(directoryPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            // recurse
            deleteFolderRecursive(curPath);
          } else {
            // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(directoryPath);
      }
    }; //response?

    const isDirectory = fs.lstatSync(oldFile).isDirectory();

    if (isDirectory) {
      deleteFolderRecursive(oldFile);
    } else {
      try {
        fs.unlinkSync(oldFile);
        console.log(oldFile + " deleted");
        res.status(200).json({ deleted: oldFile });
        //file removed
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
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
