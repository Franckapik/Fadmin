import { useRouter } from "next/router";
import { Card, Container, Figure } from "react-bootstrap";

import React from "react";
import ReactPlayer from "react-player";

export const Medias = ({ mediasFiles, setShow, show }) => {
  const router = useRouter();

  const addQuery = (key, value) => {
    setShow(!show);
    router.query[key] = value;
    router.push(router);
  };

  return (
    <Container fluid className="d-flex justify-content-center flex-wrap ">
      {" "}
      {/*justify-content-between */}
      {mediasFiles && mediasFiles != 0
        ? mediasFiles
            .sort((a, b) => a.media_position - b.media_position)
            .map((a, i) => {
              return (
                <>
                  <Card
                    border="0"
                    className="cursor mx-auto m-3 filtre "
                    onClick={() => addQuery("media", a.media_id)}
                    key={i}
                  >
                    <Card.Body
                      className="fade_short no_hover card_media "
                      style={{
                        padding: 0,
                        margin: "auto",
                        width: a.media_large ? "35vw" : "22vw",
                        height: "20vw",
                      }}
                    >
                      <img src={a.media_path} className="media_img"></img>
                      {a.media_preview && a.media_video ? (
                        <>
                          <ReactPlayer
                            className="react-player "
                            url={a.media_video}
                            width="100%"
                            height="20vw"
                            playing={true}
                            volume="0"
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
                </>
              );
            })
        : null}{" "}
    </Container>
  );
};
