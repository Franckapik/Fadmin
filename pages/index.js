import Head from "next/head";
import { useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import CarouselComp from "../components/carousel";
import { Categories } from "../components/categories";
import { Header } from "../components/header";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Home({ db_authors, mediasFiles }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid>
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header authors={db_authors}></Header>
        <main>
          <Categories blog></Categories>
          ici
          <Row>
            <Col className="mx-auto">
              <Carousel
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
                        <div class="d-flex justify-content-center">
                          <img
                            className="d-block media-view"
                            src={`/medias/${a.media_author_id}/${a.media_folder}/${a.media_photo}`}
                            alt="slider image"
                          />
                        </div>
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </Col>
          </Row>
        </main>
      </section>
    </Container>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_authors = await prisma.author.findMany();
  const mediasFiles = await prisma.media.findMany();
  return {
    props: { db_authors, mediasFiles },
  };
}
