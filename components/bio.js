import { Button, Col, Modal, Row } from "react-bootstrap";
import Flags from "country-flag-icons/react/3x2";
import { useState } from "react";

//https://catamphetamine.gitlab.io/country-flag-icons/3x2/

const Biography = ({ author, show, fullscreen, setShow }) => {
  const [lang, setlang] = useState("FR");

  return (
    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
      <Modal.Header closeButton className="cursor">
        <span onClick={() => setShow(!show)}>Back</span>
      </Modal.Header>
      <Modal.Body className="bio_modal">
        <Row>
          <Col md={1} className="d-flex" style={{ flexDirection: "column" }}>
            <Flags.FR
              title="France"
              className="flag circle cursor m-2"
              onClick={() => {
                setlang("FR");
              }}
            />
            <Flags.GB
              title="English"
              className="flag circle cursor m-2"
              onClick={() => {
                setlang("GB");
              }}
            />
          </Col>
          <Col md={11}>
            {" "}
            <h2 className="mb-4"> {author.author_name} </h2>
            {lang === "FR" ? <p> {author.author_biography_fr} </p> : null}
            {lang === "GB" ? <p> {author.author_biography_en} </p> : null}
          </Col>
        </Row>{" "}
        <div className="text-center">
          {" "}
          <Button
            variant="outline-primary"
            className="m-3 mt-4 p-5 pt-2 pb-2"
            onClick={() => setShow(!show)}
          >
            Contact
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Biography;
