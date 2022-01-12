import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { path } = req.body;
      const oldDir = "./public/medias/Old/";
      const dir = `./public/${path}`;

      req.oldImage = oldDir + file.originalname;
      req.dir = dir;
      req.oldDir = oldDir;
      req.filename = file.originalname.replace(/\.[^/.]+$/, "");

      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      } catch (err) {
        console.error(err);
      }
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
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("file"));

apiRoute.post((req, res) => {
  sharp(req.oldImage)
    .resize(1000)
    .jpeg({ mozjpeg: true, progressive: true })
    .toFile(req.dir + req.filename + ".jpg")
    .then((data) => {
      res.status(200).json({ data: "success" });
    })
    .catch((err) => {});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
