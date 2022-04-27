import { useRouter } from "next/router";
import { Card, Container, Figure } from "react-bootstrap";

import React, { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";

export const Medias = ({
  db_medias,
  setShow,
  show,
  setmediaSelected,
  db_home,
}) => {
  const router = useRouter();

  const addQuery = (key, value) => {
    setmediaSelected(value);
    router.query[key] = value;
    router.replace(router);
  };

  const media_pos = db_home.home_media_position
    .split(",")
    .map((a, i) => parseInt(a));

  return (
    <Container fluid className="d-flex justify-content-center flex-wrap ">
      {" "}
      {/*justify-content-between */}
      {db_medias && db_medias != 0
        ? db_medias
            .sort(
              (a, b) =>
                media_pos.indexOf(a.media_id) - media_pos.indexOf(b.media_id)
            )
            .map((a, i) => {
              return (
                <Card
                  border="0"
                  className="cursor mx-auto m-3 filtre "
                  onClick={() => {
                    addQuery("media", a.media_id);
                    setShow(!show);
                  }}
                  key={i}
                >
                  <Card.Body
                    className="fade_short no_hover card_media"
                    style={{
                      padding: 0,
                      margin: "auto",
                      width: a.media_large ? "35vw" : "22vw",
                      height: "20vw",
                    }}
                  >
                    <img
                      src={a.media_path.replace("./public", "")}
                      className="media_img"
                      alt="media video"
                    ></img>
                    {a.media_preview && a.media_video ? (
                      <>
                        <ReactPlayer
                          className="react-player "
                          url={a.media_video}
                          width="100%"
                          height="20vw"
                          playing={true}
                          volume={0}
                          muted
                          loop
                          controls={false}
                        />
                      </>
                    ) : null}
                  </Card.Body>
                  <Card.Footer>
                    <h5>{a.media_title || a.category?.category_name}</h5>
                    <h7>{a.media_subtitle}</h7>
                  </Card.Footer>
                </Card>
              );
            })
        : null}{" "}
    </Container>
  );
};
