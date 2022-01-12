import { Button, Col, Modal, Row } from "react-bootstrap";
import Flags from "country-flag-icons/react/3x2";
import { useState } from "react";

//https://catamphetamine.gitlab.io/country-flag-icons/3x2/

const Biography = ({ author, show, fullscreen, setShow }) => {
  const [lang, setlang] = useState("FR");

  return (
    <>
      <Row className="mt-5 bio_transition">
        <Col
          md={1}
          className="d-flex justify-content-center "
          style={{ flexDirection: "column" }}
        >
          <h2
            className="p- rotate"
            style={{ paddingLeft: "3em", whiteSpace: "nowrap" }}
          >
            {" "}
            {author.author_name}{" "}
          </h2>

          <span
            className="cursor nav-link"
            onClick={() => {
              setlang("FR");
            }}
          >
            {" "}
            FR
          </span>
          <span
            className="cursor nav-link"
            onClick={() => {
              setlang("GB");
            }}
          >
            {" "}
            EN
          </span>
        </Col>
        <Col md={11} className="bio text-center">
          {" "}
          {lang === "FR" ? <p> {author.author_biography_fr} </p> : null}
          {lang === "GB" ? <p> {author.author_biography_en} </p> : null}
        </Col>
      </Row>
      <Row>
        {" "}
        <div className="text-center">
          {" "}
          <Button className="m-3 mt-4 p-5 pt-2 pb-2" href={"/contact"}>
            Contact
          </Button>
        </div>
      </Row>
    </>
  );
};

export default Biography;
