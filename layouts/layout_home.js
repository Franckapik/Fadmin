import Head from "next/head";
import Link from "next/link";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Categories } from "../components/categories";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Layout_Home({
  children,
  author,
  authors,
  categories,
  blog,
  overview,
  contact,
  comment,
}) {
  return (
    <Container fluid className="container_main">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="paper"></div>
      <div className="shapes"></div>
      <div className="blob">Qualyn</div>
      <div className="sticker">
        <div>
          Qualyn{" "}
          <a href={author?.author_insta} className="m-2" target="_blank">
            <FontAwesomeIcon icon={faInstagram} width="1em" />{" "}
          </a>
          <a href={author?.author_fb} className="m-2" target="_blank">
            <FontAwesomeIcon icon={faFacebookSquare} width="1em" />{" "}
          </a>
        </div>
      </div>
      <section>
        <header className="text-center">
          <Row className="m-4">
            <Link href="/">
              <h1 className="cursor">
                <span style={{ fontSize: "1.2em" }}>Q</span>ualyn
              </h1>
            </Link>
          </Row>
          <Row className="blogocontact">
            <Col className="left cursor">
              <a href={`/blog`}> Blog</a>
            </Col>
            <Col className="right cursor">
              <a href={`/contact`}> Contact</a>
            </Col>
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
                          className="nav-authors frame "
                        >
                          <h2 className="m-2">
                            {" "}
                            <p>{a.author_name}</p>{" "}
                          </h2>
                          <p className="subtitle thin m-2"> {a.author_art}</p>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })
                : null}
            </Nav>
          </Row>
        </header>
        <main>
          <Categories
            categories={categories}
            author={author}
            overview={overview}
            blog={blog}
            contact={contact}
            comment={comment}
          ></Categories>

          {children}
        </main>
      </section>
      <footer></footer>
    </Container>
  );
}
