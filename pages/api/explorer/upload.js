import multer from "multer";
import nextConnect from "next-connect";
import sharp from "sharp";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const upload = multer({
  storage: multer.diskStorage({
    //tmp directory
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not supported file type!"), false);
    }
  },
});

const apiRoute = nextConnect({
  //routing
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something happened on the upload middleware! ${error.message}`,
    });
    console.log(error);
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
  .use(upload.array("file"))
  .post(async (req, res) => {
    const pathDir =
      "." + req.body.path.substring(req.body.path.indexOf("/public/"));

    const convertion = req.files.map((a, i) => {
      const newFile =
        pathDir +
        "/" +
        a.filename.substring(0, a.filename.lastIndexOf(".")) +
        ".jpg";

      console.log("Converting " + a.filename + " ...");
      console.log("Adding to  " + newFile);

      return sharp(a.path)
        .resize(1000)
        .jpeg({ mozjpeg: true, progressive: true })
        .toFile(newFile)
        .then((data) => {
          data.newFile = newFile;
          data.filename = a.filename;
          console.log("Converted: " + newFile);

          cloudinary.uploader.upload(
            newFile,
            { public_id: a.filename },
            function (error, result) {
              console.log("Stored in Cloudinary at url " + result.url);
              return result;
            }
          );
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    });

    Promise.all(convertion)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  });

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
