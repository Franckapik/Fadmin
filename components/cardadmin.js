import Link from "next/link";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const CardAdmin = ({
  all,
  title,
  text,
  edit_link,
  show,
  setShow,
  position,
  category,
  add,
  hor,
  setSelected,
  preview,
}) => (
  <Col>
    <Card
      className={`${add ? "card-admin-add" : "card-admin"} ${
        hor ? "card_add_hor" : null
      }`}
    >
      <Card.Body className="text-center">
        <a href={edit_link}>
          <Card.Title className="mt-4">
            <h2>{title || category}</h2>
          </Card.Title>
          <Card.Text>
            {preview ? (
              <div className="card_preview">
                <img src={preview} alt="preview du media" />
              </div>
            ) : null}
          </Card.Text>{" "}
          <Card.Text>
            <h6>{text}</h6>
          </Card.Text>{" "}
        </a>
        <Card.Footer>
          {" "}
          {add && !hor ? (
            <Link href={edit_link} passHref>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="cursor"
                size="4x"
              />
            </Link>
          ) : (
            <>
              {" "}
              <Link href={edit_link} passHref>
                <FontAwesomeIcon icon={faEdit} className="m-4 cursor" />
              </Link>
              <FontAwesomeIcon
                icon={faTrash}
                className="m-4 cursor"
                onClick={() => {
                  setSelected(all);
                  setShow(!show);
                }}
              />
              <div className="media_position">{position}</div>
            </>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  </Col>
);
