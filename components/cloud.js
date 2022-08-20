import Script from "next/script";
import { useEffect, useState } from "react";
import axios from "axios";

const Cloud = ({ chooseFile }) => {
  const [scriptLoaded, setscriptLoaded] = useState(false);
  const [signature, setSignature] = useState(false);
  const [timestamp, setTimestamp] = useState(false);

  useEffect(() => {
    axios
      .post("/api/media/signature", {
        timestamp: Math.floor(Date.now() / 1000),
      })
      .then((response) => {
        setSignature(response.data.signature);
        setTimestamp(response.data.expire);
      });
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      window.ml = cloudinary.openMediaLibrary(
        {
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          remove_header: true,
          max_files: "1",
          insert_caption: "Choisir",
          inline_container: "#widget_container",
          default_transformations: [[]],
          timestamp: timestamp,
          username: process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME,
          signature: signature,
        },
        {
          insertHandler: function (data) {
            chooseFile(data.assets);

            data.assets.forEach((asset) => {
              console.log("Inserted asset:", JSON.stringify(asset, null, 2));
            });
          },
        },
        document.getElementById("open-btn")
      );
    }

    return;
  }, [scriptLoaded]);

  return (
    <>
      <Script
        src="https://media-library.cloudinary.com/global/all.js"
        onLoad={() => setscriptLoaded(true)}
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      />
      <div id="widget_container"></div>
    </>
  );
};

export default Cloud;
