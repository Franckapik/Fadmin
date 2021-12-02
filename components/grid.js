import Link from "next/link";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const Grid = ({ title, text, edit_link }) => (
  <Col>
    <Card className="card_admin">
      <Card.Body className="text-center">
        <Card.Title className="mt-4">
          <h2>{title}</h2>
        </Card.Title>
        <Card.Text>
          <h6>{text}</h6>
        </Card.Text>
        <Card.Footer>
          {" "}
          <Link href={edit_link}>
            <FontAwesomeIcon icon={faEdit} className="m-2 cursor" />
          </Link>
          <Link href={`/admin/category/`}>
            <FontAwesomeIcon icon={faTrash} className="m-2 cursor" />
          </Link>
        </Card.Footer>
      </Card.Body>
    </Card>
  </Col>
);
