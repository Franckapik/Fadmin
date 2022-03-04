import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";
import { resolve } from "path";
import { rejects } from "assert";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(
        "Receveid: " + file.originalname + " Destination: " + req.body.path
      );

      //constructing path
      const { chemin } = req.body;
      const oldDir = "./public/medias/Old/";
      const dir = `./public${chemin}/`;

      //creating folder according to new path
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      } catch (err) {
        console.error(err);
      }
      //creating file in old path to be converted next
      cb(null, oldDir);
    },
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something happened on the upload middleware! ${error.message}`,
    });
    console.log(error);
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("file"));

apiRoute.post((req, res) => {
  //creating new file path
  //resizing and converting to jpg in new path
  Promise.all(
    //How to return all responses here ?
    req.files.map((a, i) => {
      const newFile = `./public${req.body.path}/${a.filename}`;
      console.log("Converting " + a.filename + " ...");

      /*  console.log(req.files); */ //to have all informations

      sharp(a.path)
        .resize(1000)
        .jpeg({ mozjpeg: true, progressive: true })
        .toFile(newFile)
        .then((data) => {
          data.newFile = newFile;
          console.log("Converted: " + newFile);
          return data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    })
  )
    .then((values) => res.status(200).json(values))
    .catch((err) => res.status(500).json(err));
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
