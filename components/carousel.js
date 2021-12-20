import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import React from "react";
import ReactPlayer from "react-player";

export default function CarouselComp({ mediasFiles }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const router = useRouter();

  const mediaSelected = mediasFiles.filter(
    (a) => a.media_id == router.query.media
  );

  return (
    <Container fluid className="text-center">
      {mediaSelected && mediaSelected[0]?.media_video ? (
        <>
          <Row className="mb-3">
            <a href={mediaSelected[0].media_link} target="_blank">
              {mediaSelected[0].media_title}
            </a>
          </Row>
          <Row>
            <Col className="player-wrapper">
              <ReactPlayer
                className="react-player"
                width="100%"
                height="100%"
                controls
                url={mediaSelected[0].media_video}
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col className="mx-auto">
              <Carousel
                variant="dark"
                activeIndex={index}
                onSelect={handleSelect}
                className="carousel-media"
                controls={mediaSelected[0].files.length - 1}
                indicators={mediaSelected[0].files.length - 1 || null}
              >
                {mediaSelected &&
                  mediaSelected[0].files.map((a, i) => {
                    const path_client_img =
                      mediaSelected[0].folder_path.substr(7) + "/" + a;

                    return (
                      <Carousel.Item key={i}>
                        <div className="d-flex justify-content-center">
                          <a target="_blank" href={mediaSelected[0].media_link}>
                            <img
                              className="d-block media-view"
                              src={path_client_img}
                              alt="slider image"
                            />
                          </a>
                        </div>
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </Col>
          </Row>
          <Row>
            <ListGroup horizontal className="mt-5 justify-content-center">
              <ListGroup.Item>
                {mediaSelected[0].media_subtitle}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <strong>{mediaSelected[0].author.author_name}</strong>
              </ListGroup.Item>
              {mediaSelected[0].files.length === 1 ? (
                <ListGroup.Item>{mediaSelected[0].media_title}</ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  {" "}
                  {String(index).padStart(2, "0") +
                    "/" +
                    String(mediaSelected[0]?.files.length - 1).padStart(2, "0")}
                </ListGroup.Item>
              )}
              <ListGroup.Item>{mediaSelected[0].media_content}</ListGroup.Item>
            </ListGroup>
          </Row>
        </>
      )}
    </Container>
  );
}
