import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export const Header = ({ authors }) => {
  return (
    <header className="text-center">
      <Row className="m-4">
        <h1>QUALYN</h1>
      </Row>
      <Row className="justify-content-md-center authors pb-2">
        {authors && authors.length
          ? authors.map((a, i) => {
              return (
                <Col lg="2">
                  <Link href={`/authors/${a.author_id}`}>
                    <a>
                      <h2>
                        {" "}
                        <p>{a.author_name}</p>{" "}
                      </h2>
                      <p className="thin"> {a.author_art}</p>
                    </a>
                  </Link>
                </Col>
              );
            })
          : null}
      </Row>
    </header>
  );
};
