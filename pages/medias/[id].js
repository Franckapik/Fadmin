import { useRouter } from "next/router";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import fs from "fs";
const fsPromises = fs.promises;
import path from "path";
import getConfig from "next/config";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import { useState } from "react";

function Media({ media, filesTri }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const router = useRouter();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <span onClick={() => router.back()}>Back</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mx-auto">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {filesTri.map((slide, i) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={"/medias/2/01/" + slide}
                    alt="slider image"
                  />
                  <Carousel.Caption>
                    <h3>Exemple de caption</h3>
                    <p>{slide.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div className="row">
        <div class="col-md-6 mx-auto">
          PHOTOGRAPHY {media.media_title} {String(index).padStart(2, "0")} /{" "}
          {String(filesTri.length - 1).padStart(2, "0")}{" "}
          {media.category.category_name}
        </div>
      </div>
    </div>
  );
}
export default Media;

export async function getServerSideProps({ params, query }) {
  const id = query.id;

  const media0 = await prisma.media.findUnique({
    where: {
      media_id: Number(id) || -1,
    },
    include: {
      category: true,
    },
  });

  const media = JSON.parse(JSON.stringify(media0)); //issue with Date from PSQL with NextJS

  console.log(media);
  const EXTENSION = [".jpeg", ".jpg", ".png"];

  const filesList = await fsPromises.readdir(
    path.join(
      getConfig().serverRuntimeConfig.PROJECT_ROOT,
      `/public/medias/${id}/${media.media_folder}`
    )
  );

  const filesTri = filesList.filter((file) => {
    const fileExt = path.extname(file).toLowerCase();
    return EXTENSION.includes(fileExt);
  });

  console.log("ici", filesTri);

  return {
    props: { media, filesTri },
  };
}
