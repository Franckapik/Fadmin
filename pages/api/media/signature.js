import CryptoJS from "crypto-js";

export default async (req, res) => {
  const data = req.body;
  const expire = data.timestamp + 3600; //1 hour since now

  try {
    const hash = CryptoJS.SHA256(
      `cloud_name=${process.env.CLOUDINARY_NAME}&timestamp=${expire}&username=${process.env.CLOUDINARY_USERNAME}${process.env.CLOUDINARY_API_SECRET}`
    ).toString(CryptoJS.enc.Hex);
    res.status(200).json(hash);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while opening media library" + err });
  }
};
