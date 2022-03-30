import path from "path";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (req, res) => {
  const p = req.body.public_id;
  const d = path.dirname(p);
  console.log(d);

  try {
    cloudinary.search
      .expression(`folder:\"${d}/*\"`)
      .execute()
      .then((result) => {
        res.status(200).json({ list: result });
      });
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while adding a new media." + err });
  }
};
