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
    </Container>
  );
};
