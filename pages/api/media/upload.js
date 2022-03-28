import fs from "fs";
import multer from "multer";
import nextConnect from "next-connect";
import sharp from "sharp";

const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "quadratik-fr",
  api_key: "857781879738936",
  api_secret: "7O58YlaYxIgZ95eFL6okVNSmIkc",
});

const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);

const upload = multer({
  storage: multer.diskStorage({
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

apiRoute.post(async (req, res) => {
  //creating new file path
  //resizing and converting to jpg in new path
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }
    const file64 = formatBufferTo64(req.file);
    const uploadResult = await cloudinaryUpload(file64.content);

    return res.json({
      cloudinaryId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });
  } catch (e) {
    return res.status(422).send({ message: e.message });
  }

  //How to return all responses here ?
  const convertion = req.files.map(async (a, i) => {
    const newFile = `./public${req.body.path}/${a.filename}`;
    console.log("Converting " + a.filename + " ...");

    /*  console.log(req.files); */ //to have all informations

    /*  return sharp(a.path)
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
      }); */
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
