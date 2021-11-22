import { useRouter } from "next/router";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import fs from "fs";
import path from "path";
import getConfig from "next/config";

const Media = ({ media }) => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <>
      {media && media.media_id ? (
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              {media.media_photo ? (
                <img
                  src={"/" + media.media_photo}
                  className="d-block w-100"
                  alt="..."
                ></img>
              ) : null}
              <div className="carousel-caption d-none d-md-block">
                <h5>{media.media_title}</h5>
                <p>{media.media_content}</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="..." className="d-block w-100" alt="..."></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="..." className="d-block w-100" alt="..."></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        "Pas de media"
      )}
    </>
  );
};

export default Media;

export async function getServerSideProps({ params, query }) {
  const media0 = await prisma.media.findUnique({
    where: {
      media_id: Number(query?.id) || -1,
    },
  });

  fs.readdir(
    path.join(
      getConfig().serverRuntimeConfig.PROJECT_ROOT,
      "/public/medias/2/01"
    ),
    (err, files) => {
      console.log(files);
      /*     files.forEach((file) => {
      console.log(file);
    }); */
    }
  );

  const media = JSON.parse(JSON.stringify(media0)); //issue with Date from PSQL with NextJS

  return {
    props: { media },
  };
}
