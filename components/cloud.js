import Script from "next/script";
import { useEffect, useState } from "react";
import axios from "axios";

const Cloud = ({ chooseFile }) => {
  const [scriptLoaded, setscriptLoaded] = useState(false);
  const [signature, setSignature] = useState(false);

  useEffect(() => {
    if (scriptLoaded) {
      axios
        .post("/api/media/signature", {
          timestamp: Math.floor(Date.now() / 1000),
        })
        .then((response) => {
          setSignature(response.data);

          window.ml = cloudinary.openMediaLibrary(
            {
              cloud_name: "quadratik-fr",
              api_key: "857781879738936",
              remove_header: true,
              max_files: "1",
              insert_caption: "Choisir",
              inline_container: "#widget_container",
              default_transformations: [[]],
              timestamp: 1649800265,
              username: "fanch44@hotmail.com",
              signature: signature,
              //cloud_name=quadratik-fr&timestamp=1649800265&username=fanch44@hotmail.com7O58YlaYxIgZ95eFL6okVNSmIkc
            },
            {
              insertHandler: function (data) {
                chooseFile(data.assets);

                data.assets.forEach((asset) => {
                  console.log(
                    "Inserted asset:",
                    JSON.stringify(asset, null, 2)
                  );
                });
              },
            },
            document.getElementById("open-btn")
          );
        });
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
