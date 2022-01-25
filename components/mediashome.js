import { useRouter } from "next/router";
import { Card, Container, Figure } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export const MediasHome = ({ mediasFiles, setShow, show }) => {
  const router = useRouter();
  const [pos, setPos] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((pos) => pos + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center flex-wrap d-none d-sm-flex "
    >
      {" "}
      {/*justify-content-between */}
      {mediasFiles && mediasFiles != 0
        ? mediasFiles
            .sort((a, b) => a.media_position - b.media_position)
            .map((a, i) => {
              return (
                <Card
                  border="0"
                  className="cursor m-3 filtre barre "
                  key={i}
                  style={{
                    top: `${20 * Math.random()}vh`,
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
              );
            })
        : null}{" "}
    </Container>
  );
};
