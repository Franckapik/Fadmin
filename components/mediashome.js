import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";

export const MediasHome = ({ db_home }) => {
  return (
    <Container className="d-flex justify-content-center flex-wrap no-overflow">
      <div className="react-player-home fade_short no_hover">
        <ReactPlayer
          url={db_home.home_video_url}
          playing={true}
          volume={0}
          muted
          loop
          className="essai"
          controls={false}
        />
      </div>
    </Container>
  );
};
