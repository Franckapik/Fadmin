import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { path } = req.body;
      const dir = `./public/${path}`;
      req.image = dir + file.originalname;
      req.dir = dir;
      req.filename = file.originalname.replace(/\.[^/.]+$/, "");

      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      } catch (err) {
        console.error(err);
      }
      cb(null, dir);
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
  sharp(req.image)
    .resize(1000)
    .jpeg({ mozjpeg: true })
    .toFile(req.dir + req.filename + ".jpg")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
