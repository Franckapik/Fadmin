import fs from "fs";
import fsFileTree from "fs-file-tree";
import * as read from "recursive-readdir-async";

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function (req, res) {
  return new Promise((resolve, reject) => {
    const dir0 = "./public/medias/";

    cloudinary.v2.api.resources(function (error, result) {
      const d = result.resources;
      d.forEach((e) => {
        e.public_id.split("/").reduce((acc, cur, i, a) => {
          if (acc[cur]) {
            //do nothing
            console.log(acc[cur]);
          } else {
            /*             console.log(acc);
             */ acc[cur] = [];
            return acc;
          }
        }, []);
        console.log(qqchose);
      });

      /*  const f = d.reduce((acc, obj, i, a) => {
        var path = obj["public_id"];
        const paths = path.split("/");
        paths.forEach((p) => {
          if (!acc[p]) {
            acc[p] = [];
          } else {
            acc[p].push(obj);
          }
        });
        return acc;
        /*  if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj.public_id);
        return acc; */
      /*}, {});
      console.log(f); */
    });

    read
      .list(dir0, { mode: read.TREE, ignoreFolders: false })
      .then((tree) => {
        res.status(200).json(tree);
        resolve();
      })
      .catch((error) => {
        res.json({ err: "Error occured while listing explorer: " + err });
        res.status(405).end();
        resolve();
      });
  });
}

/*  {
      asset_id: 'b0c1eed98097aeba3772aba48f06a531',
      public_id: 'samples/landscapes/landscape-panorama',
      format: 'jpg',
      version: 1648304319,
      resource_type: 'image',
      type: 'upload',
      created_at: '2022-03-26T14:18:39Z',
      bytes: 7858062,
      width: 10906,
      height: 2349,
      url: 'http://res.cloudinary.com/quadratik-fr/image/upload/v1648304319/samples/landscapes/landscape-panorama.jpg',
      secure_url: 'https://res.cloudinary.com/quadratik-fr/image/upload/v1648304319/samples/landscapes/landscape-panorama.jpg'
    },
    {
      asset_id: '85e3a88623c22d2c351edec8bb8b902f',
      public_id: 'samples/animals/kitten-playing',
      format: 'gif',
      version: 1648304318,
      resource_type: 'image',
      type: 'upload',
      created_at: '2022-03-26T14:18:38Z',
      bytes: 6620002,
      width: 320,
      height: 180,
      url: 'http://res.cloudinary.com/quadratik-fr/image/upload/v1648304318/samples/animals/kitten-playing.gif',
      secure_url: 'https://res.cloudinary.com/quadratik-fr/image/upload/v1648304318/samples/animals/kitten-playing.gif'
    }, */

/* [
  {
    name: '1',
    title: '1',
    path: '/home/fanch/qualyn/public/medias',
    fullname: '/home/fanch/qualyn/public/medias/1',
    isDirectory: true,
    content: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  {
    name: 'leeloo',
    title: 'leeloo',
    path: '/home/fanch/qualyn/public/medias',
    fullname: '/home/fanch/qualyn/public/medias/leeloo',
    isDirectory: true,
    content: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  }
] */
