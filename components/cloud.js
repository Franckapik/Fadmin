import Script from "next/script";
import { useEffect, useState } from "react";

const Cloud = ({ chooseFile }) => {
  const [scriptLoaded, setscriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded) {
      console.log(cloudinary);
      window.ml = cloudinary.openMediaLibrary(
        {
          cloud_name: "quadratik-fr",
          api_key: "857781879738936",
          remove_header: true,
          max_files: "1",
          insert_caption: "Choisir",
          inline_container: "#widget_container",
          default_transformations: [[]],
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

    return () => {
      null;
    };

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
