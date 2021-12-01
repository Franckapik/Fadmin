import Link from "next/link";
import { Col, Nav, Row } from "react-bootstrap";

export const Header = ({ authors }) => {
  return (
    <header className="text-center">
      <Row className="m-4">
        <h1>QUALYN</h1>
      </Row>
      <Row className="justify-content-md-center pb-2">
        <Nav className="justify-content-center">
          {authors && authors.length
            ? authors.map((a, i) => {
                return (
                  <Nav.Item key={i + 1}>
                    <Nav.Link
                      eventKey={i}
                      onClick={() => addQuery("categ", a.category_id)}
                      href={`/authors/${a.author_id}`}
                      className="nav-authors"
                    >
                      <h2>
                        {" "}
                        <p>{a.author_name}</p>{" "}
                      </h2>
                      <p className="thin"> {a.author_art}</p>
                    </Nav.Link>
                  </Nav.Item>
                );
              })
            : null}
        </Nav>
      </Row>
    </header>
  );
};
