import { useRouter } from "next/router";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselComp({ mediasFiles }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const router = useRouter();

  const mediaSelected = mediasFiles.filter(
    (a) => a.media_id == router.query.media
  );

  console.log(mediaSelected);

  return (
    <>
      {mediaSelected && mediaSelected[0] ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {mediaSelected &&
                  mediaSelected[0].files.map((a, i) => {
                    const path_client_img =
                      mediaSelected[0].folder_path.substr(7) + "/" + a;

                    return (
                      <Carousel.Item key={i}>
                        <img
                          className="d-block w-100"
                          src={path_client_img}
                          alt="slider image"
                        />
                        <Carousel.Caption>
                          <h3>Exemple de caption</h3>
                          <p>{a.description}</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>
          </div>
          <div className="row">
            <div class="col-md-6 mx-auto">
              PHOTOGRAPHY {mediaSelected.media_title}{" "}
              {String(index).padStart(2, "0")} /{" "}
              {String(mediaSelected[0]?.files.length - 1).padStart(2, "0")}{" "}
              {/*               {mediaSelected[0].category.category_name}
               */}{" "}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
