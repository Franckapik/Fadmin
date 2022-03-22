import fs from "fs";

export default async (req, res) => {
  return new Promise((resolve) => {
    console.log("Create directory inside " + req.body.file.fullname);
    const file = req.body.file;
    const created = req.body.created;
    const isDir = file.isDirectory;
    const pathNewDir =
      "." +
      file.fullname.substring(file.fullname.indexOf("/public/")) +
      "/" +
      created;

    console.log("Création du nouveau dossier : " + pathNewDir);

    //rename on server

    try {
      if (!fs.existsSync(pathNewDir)) {
        fs.mkdirSync(pathNewDir);
        res.status(200).json({ created: created });
      } else {
        console.log("Existing folder");
        res.status(403).json({ err: "Existing folder" });
      }
    } catch (err) {
      console.error(err);
      res.status(403).json({ err: err });
    }
  });
};

// avoir warn API resolved without sending a response for /api/explorer/rename, this may result in stalled requests.
export const config = {
  api: {
    externalResolver: true,
  },
};
