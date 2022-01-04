import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(req, res) {
  return new Promise(async (resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async function (err, fields, files) {
      Object.keys(files).map((i) => {
        console.log(files[i].filepath);
        saveFile(files[i], fields.path);
      });

      return res.status(201).send("success");
    });
  });
}

const saveFile = (file, path) => {
  console.log(file, path);
  const publicPath = `./public/${path}`;
  const publicFolder = publicPath.substring(0, publicPath.lastIndexOf("/"));
  console.log(publicFolder);

  if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder, { recursive: true });
  }

  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(publicPath, data);

  return;
};
