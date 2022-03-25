//need res.json and catch errors
import fs from "fs";
import path from "path";

export default async (req, res) => {
  const file = req.body.file;
  const isDir = file.isDirectory;

  const oldFile =
    "." + file.fullname.substring(file.fullname.indexOf("/public/"));

  const deleteFolderRecursive = function (directoryPath) {
    if (fs.existsSync(directoryPath)) {
      fs.readdirSync(directoryPath).forEach((file) => {
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
  };

  if (isDir) {
    //folder + files
    deleteFolderRecursive(oldFile);
    console.log(oldFile + " folder deleted");
    res.status(200).json({ deleted: file.name });
  } else {
    //file
    fs.unlinkSync(oldFile);
    console.log(oldFile + "  file deleted");
    res.status(200).json({ deleted: file.name });
  }
};

// avoir warn API resolved without sending a response for /api/explorer/rename, this may result in stalled requests.
export const config = {
  api: {
    externalResolver: true,
  },
};
