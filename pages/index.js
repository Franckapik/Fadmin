import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MediasHome } from "../components/mediashome";
import Layout_Home from "../layouts/layout_home";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Home({ db_authors, mediasFiles }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Layout_Home authors={db_authors}>
      <Row>
        <Col className="mx-auto">
          {/* <Carousel
            fade
            variant="dark"
            activeIndex={index}
            onSelect={handleSelect}
            className="carousel-home"
            controls={false}
          >
            {mediasFiles &&
              mediasFiles.map((a, i) => {
                return (
                  <Carousel.Item key={i}>
                    <div className="d-flex justify-content-center">
                      <img
                        className="d-block media-view"
                        src={`/medias/${a.media_author_id}/${a.media_folder}/${a.media_photo}`}
                        alt="slider image"
                      />
                    </div>
                  </Carousel.Item>
                );
              })}
          </Carousel> */}
          <MediasHome
            mediasFiles={mediasFiles}
          ></MediasHome>
        </Col>
      </Row>
    </Layout_Home>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_authors = await prisma.author.findMany({
    where: {
      author_draft: false,
    },
  });
  const mediasFiles = await prisma.media.findMany({
    where: {
      media_home: true,
    },
    include: {
      author: true,
    },
  });
  return {
    props: { db_authors, mediasFiles },
  };
}
