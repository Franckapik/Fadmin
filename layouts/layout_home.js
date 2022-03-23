import Head from "next/head";
import Link from "next/link";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Categories } from "../components/categories";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout_Home({
  children,
  author,
  authors,
  categories,
  blog,
  overview,
  contact,
  comment,
  db_home,
}) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const listenToScroll = () => {
    let heightToHideFrom = 100;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      isVisible && // to limit setting state only the first time
        setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isOpen ? (
        <div className="burger-menu">
          <Row className="justify-content-md-center pb-2 ">
            <Nav className="justify-content-center">
              {authors && authors.length
                ? authors.map((a, i) => {
                    return (
                      <Nav.Item key={"author" + i + 1} className="burger_item">
                        <Nav.Link eventKey={i} href={`/authors/${a.author_id}`}>
                          <h2>{a.author_art}</h2>
                          <span>{a.author_name}</span>{" "}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })
                : null}
              <Nav.Item key={"blog"} className="burger_item">
                <Nav.Link eventKey={"blog"} href={`/blog`}>
                  <h2>Blog</h2>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item key={"contact"} className="burger_item">
                <Nav.Link eventKey={"contact"} href={`/contact`}>
                  <h2>Contact</h2>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <div className="menu-contact ">
            {" "}
            <a href={db_home.home_fb} className="m-4" target="_blank">
              <FontAwesomeIcon icon={faFacebookSquare} width="2em" />{" "}
            </a>
            <a href={db_home.home_insta} className="m-4" target="_blank">
              <FontAwesomeIcon icon={faInstagram} width="2em" />{" "}
            </a>
          </div>
        </div>
      ) : null}

      <Container fluid className="container_main">
        <Head>
          <title>{db_home.home_name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {isVisible && (
          <div className="burger d-xs-block d-sm-none">
            {isOpen ? (
              <i className="fal fa-times" onClick={() => setOpen(!isOpen)}></i>
            ) : (
              <i className="fal fa-bars" onClick={() => setOpen(!isOpen)}></i>
            )}
          </div>
        )}

        <div className="paper"></div>
        <div className="shapes"></div>
        <div className="title_bg">{db_home.home_name}</div>
        <div className="sticker d-none d-lg-flex">
          <div>
            {db_home.home_name}
            <a
              href={db_home?.home_insta || author?.author_insta}
              className="m-2 cursor"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} width="1em" />{" "}
            </a>
            <a
              href={db_home?.home_fb || author?.author_fb}
              className="m-2 cursor"
              target="_blank"
            >
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
                    src={db_home.home_logo}
                    alt="title"
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
