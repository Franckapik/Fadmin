import Link from "next/link";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const CardAdmin = ({
  title,
  text,
  edit_link,
  show,
  setShow,
  position,
  category,
}) => (
  <Col>
    <Card className="card-admin">
      <Card.Body className="text-center">
        <Card.Title className="mt-4">
          <h2>{title || category}</h2>
        </Card.Title>
        <Card.Text>
          <h6>{text}</h6>
        </Card.Text>
        <Card.Footer>
          {" "}
          <Link href={edit_link}>
            <FontAwesomeIcon icon={faEdit} className="m-2 cursor" />
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            className="m-2 cursor"
            onClick={() => setShow(!show)}
          />
          <div className="media_position">{position}</div>
        </Card.Footer>
      </Card.Body>
    </Card>
  </Col>
);
