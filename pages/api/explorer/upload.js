import multer from "multer";
import nextConnect from "next-connect";
import sharp from "sharp";

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

apiRoute.post((req, res) => {
  const pathDir =
    "." + req.body.path.substring(req.body.path.indexOf("/public/"));

  const convertion = req.files.map((a, i) => {
    const newFile = pathDir + "/" + a.filename;
    console.log("Converting " + a.filename + " ...");
    console.log("Adding to  " + newFile);

    /*  console.log(req.files); */ //to have all informations

    return sharp(a.path)
      .resize(1000)
      .jpeg({ mozjpeg: true, progressive: true })
      .toFile(newFile)
      .then((data) => {
        data.newFile = newFile;
        data.filename = a.filename;
        console.log("Converted: " + newFile);
        return data;
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
