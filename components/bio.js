import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const Biography = ({ author, show, fullscreen, setShow }) => {
  const [lang, setlang] = useState("FR");

  return (
    <>
      <Row className="mt-4 bio_transition justify-content-center ">
        <Col md={8} className="bio text-center no-upper">
          {lang === "FR" ? (
            <p className="lines_spaces"> {author.author_biography_fr} </p>
          ) : null}
          {lang === "GB" ? <p> {author.author_biography_en} </p> : null}
        </Col>
      </Row>
      <Row>
        {" "}
        <div className="text-center flag">
          <span
            className="cursor m-3"
            onClick={() => {
              setlang("FR");
            }}
          >
            {" "}
            FR
          </span>
          <span
            className="cursor m-3"
            onClick={() => {
              setlang("GB");
            }}
          >
            {" "}
            EN
          </span>
        </div>
      </Row>
      <Row>
        {" "}
        <div className="text-center">
          {" "}
          <Button
            variant="outline-dark"
            className="m-3 mt-4 p-5 pt-2 pb-2"
            href={"/contact"}
          >
            Contact
          </Button>
        </div>
      </Row>
    </>
  );
};

export default Biography;
