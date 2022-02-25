import Head from "next/head";
import Link from "next/link";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Categories } from "../components/categories";
import {
  faFacebookSquare,
  faInstagram,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="burger-menu">
          <Row className="justify-content-md-center pb-2 ">
            <Nav className="justify-content-center">
              {authors && authors.length
                ? authors.map((a, i) => {
                    return (
                      <Nav.Item key={"author" + i + 1}>
                        <Nav.Link eventKey={i} href={`/authors/${a.author_id}`}>
                          <h2 className="burger-menu-title">{a.author_art}</h2>
                          <p className="burger-menu-subtitle">
                            {a.author_name}
                          </p>{" "}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })
                : null}
              <Nav.Item key={"contact"}>
                <Nav.Link eventKey={"contact"} href={`/contact`}>
                  <h2 className="burger-menu-title">Contact</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <div className="menu-contact ">
            {" "}
            <a href={author?.author_fb} className="m-4" target="_blank">
              <FontAwesomeIcon icon={faFacebookSquare} width="2em" />{" "}
            </a>
            <a href={author?.author_insta} className="m-4" target="_blank">
              <FontAwesomeIcon icon={faInstagram} width="2em" />{" "}
            </a>
            <a href={author?.author_twitter} className="m-4" target="_blank">
              <FontAwesomeIcon icon={faTwitterSquare} width="2em" />{" "}
            </a>
          </div>
        </div>
      ) : null}

      <Container fluid className="container_main">
        <Head>
          <title>Qualyn</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="burger d-xs-block d-sm-none">
          {isOpen ? (
            <i className="fal fa-times" onClick={() => setOpen(!isOpen)}></i>
          ) : (
            <i className="fal fa-bars" onClick={() => setOpen(!isOpen)}></i>
          )}
        </div>

        <div className="paper"></div>
        <div className="shapes"></div>
        <div className="title_bg">Qualyn</div>
        <div className="sticker d-none d-lg-flex">
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
            <Row>
              <Link href="/" passHref>
                <h1 className="cursor title">
                  <img
                    src={"/title.svg"}
                    alt="qualyn title"
                    className={"cursor title"}
                  ></img>
                </h1>
              </Link>
            </Row>
            <Row className="blogocontact d-none d-md-flex">
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
                        <Nav.Item key={"author" + i + 1}>
                          <Nav.Link
                            eventKey={i}
                            href={`/authors/${a.author_id}`}
                            className={
                              router.query.author == a.author_id
                                ? "active-author nav-authors  "
                                : "nav-authors frame"
                            }
                          >
                            <h2> {a.author_name}</h2>
                            <span className="subtitle thin">
                              {" "}
                              {a.author_art}
                            </span>
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
    </>
  );
}
