import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ReactPlayer from "react-player";

export default function CarouselComp({ db_medias }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [album, setAlbum] = useState(false);

  const router = useRouter();

  const [mediaSelected, setmediaSelected] = useState(
    db_medias.filter((a, i) => a.media_id === router.query.media)[0]
  );

  useEffect(() => {
    if (mediaSelected && mediaSelected.media_album) {
      axios
        .post("/api/media/listAlbum", { public_id: mediaSelected.media_photo })
        .then((response) => {
          setAlbum(response.data.list.resources);
        });
    }
  }, [mediaSelected]);

  const [playing, setPlay] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const player = useRef();

  return (
    <Container fluid className="text-center ">
      {mediaSelected && mediaSelected.media_video ? (
        <>
          <Row>
            <ListGroup horizontal className="legend justify-content-center">
              <ListGroup.Item>
                <small>{mediaSelected.media_content}</small> /{" "}
                <small>{mediaSelected.media_subtitle}</small>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>{mediaSelected.author.author_name}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <small>{mediaSelected.media_title}</small>
              </ListGroup.Item>
            </ListGroup>
          </Row>

          {mediaSelected && mediaSelected.media_video.includes("soundcloud") ? (
            <Row className="justify-content-center">
              {" "}
              <Card className="p-2 d-flex flex-row flex-nowrap justify-content-center align-items-center card-audio">
                <Col md={1}>
                  <div>
                    {playing ? (
                      <FontAwesomeIcon
                        icon={faPauseCircle}
                        className="m-2 cursor "
                        width={50}
                        onClick={() => setPlay(!playing)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlayCircle}
                        className="m-2 cursor "
                        width={50}
                        onClick={() => setPlay(!playing)}
                      />
                    )}
                  </div>
                </Col>
                <Col md={1}>
                  {new Date(played * 1000).toISOString().substr(14, 5)}
                </Col>

                <ProgressBar
                  className="progress-top"
                  now={(played * 100) / duration}
                />

                <Col md={5}>
                  {" "}
                  <Form.Range
                    value={played}
                    min={0}
                    max={duration}
                    onChange={(e) => setPlayed(parseFloat(e.target.value))}
                    onMouseUp={(e) => {
                      player.current.seekTo(parseFloat(e.target.value));
                    }}
                  />
                </Col>
                <Col md={1}>
                  {new Date(duration * 1000).toISOString().substr(14, 5)}
                </Col>
              </Card>
              <Col className="react-player-soundcloud">
                <ReactPlayer
                  ref={player}
                  playing={playing}
                  controls
                  url={mediaSelected.media_video}
                  onProgress={(p) => {
                    setPlayed(p.playedSeconds.toFixed(0));
                  }}
                  onSeek={(s) => {
                    console.log(s);
                  }}
                  onDuration={(d) => setDuration(d)}
                />
              </Col>
            </Row>
          ) : (
            <Col className="player-wrapper">
              <ReactPlayer
                className="react-player"
                width="100%"
                height="100%"
                controls
                url={mediaSelected.media_video}
              />
            </Col>
          )}
        </>
      ) : (
        // no video
        <>
          {album ? (
            <>
              <Row>
                <Col className="mx-auto">
                  <Carousel
                    variant="dark"
                    activeIndex={index}
                    onSelect={handleSelect}
                    className="carousel-media"
                    controls={album.length - 1}
                    indicators={album.length - 1 || null}
                  >
                    {album.map((a, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <div className="d-flex justify-content-center">
                            <img
                              className="d-block media-view"
                              src={a.url}
                              alt="slider image"
                            />
                          </div>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </Col>
              </Row>
              <Row>
                <ListGroup
                  horizontal
                  className="legend justify-content-center "
                >
                  <ListGroup.Item>
                    {mediaSelected?.media_subtitle}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <strong>{mediaSelected?.author?.author_name}</strong>
                  </ListGroup.Item>
                  {album.length === 0 ? (
                    <ListGroup.Item>
                      {mediaSelected?.media_title}
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item>
                      {" "}
                      {String(index).padStart(2, "0") +
                        "/" +
                        String(album?.length - 1).padStart(2, "0")}
                    </ListGroup.Item>
                  )}
                  {mediaSelected?.media_content ? (
                    <ListGroup.Item>
                      {mediaSelected.media_content}
                    </ListGroup.Item>
                  ) : null}
                </ListGroup>
              </Row>
            </>
          ) : (
            "Chargement..."
          )}
        </>
      )}
    </Container>
  );
}
