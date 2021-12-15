import { Modal } from "react-bootstrap";

const Biography = ({ author, show, fullscreen, setShow }) => {
  return (
    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
      <Modal.Header closeButton className="cursor">
        <span onClick={() => setShow(!show)}>Back</span>
      </Modal.Header>
      <Modal.Body className="bio_modal">
        <h2> {author.author_name} </h2>
        <p> {author.author_biography_fr} </p>
        <p> {author.author_biography_en} </p>
      </Modal.Body>
    </Modal>
  );
};

export default Biography;
