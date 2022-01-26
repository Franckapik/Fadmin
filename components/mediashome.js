import { useRouter } from "next/router";
import { Card, Container, Figure } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

export const MediasHome = ({ mediasFiles, setShow, show }) => {
  const router = useRouter();

  return (
    <Container
      fluid
      className="d-flex justify-content-center flex-wrap d-none d-sm-flex "
    >
      {" "}
      {/*justify-content-between */}
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
    </Container>
  );
};
