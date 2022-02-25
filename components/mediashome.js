import { useRouter } from "next/router";
import { Card, Carousel, Container, Figure, Row } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

export const MediasHome = ({ mediasFiles, setShow, show }) => {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid className="d-flex justify-content-center flex-wrap">
      <div className=" d-none d-sm-flex ">
        {mediasFiles && mediasFiles != 0
          ? mediasFiles.map((a, i) => {
              return (
                <Link
                  href={`/authors/${a.author.author_id}`}
                  key={"mediasFile" + i}
                  passHref
                >
                  <Card
                    border="0"
                    className="cursor m-3 filtre-hard barre"
                    style={{
                      top: `${i * Math.random() * 2}vh`,
                      height: `${Math.floor(1 * (40 - 25 + 1) + 25)}vh`,
                    }}
                  >
                    <Card.Body
                      className="fade-short "
                      style={{
                        width: "70px",
                        backgroundImage: `url("${a.media_path}")`, ///medias/1/03/03.png
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        borderRadius: "50px 50px 3%",
                      }}
                    ></Card.Body>
                  </Card>
                </Link>
              );
            })
          : null}{" "}
      </div>
      <div className="d-sm-none mt-5">
        <Row>
          {" "}
          <Carousel
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
          </Carousel>
        </Row>
      </div>
    </Container>
  );
};
