import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import Biography from "./bio";

export const Categories = ({ categories, blog, overview, author, contact }) => {
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  const router = useRouter();

  const addQuery = (key, value) => {
    router.query[key] = value;
    router.push(router);
  };

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <div className="mb-5">
      <Nav className="justify-content-center  align-items-center">
        {overview ? (
          <Nav.Item key="0">
            <Nav.Link eventKey="0" onClick={() => addQuery("categ", 0)}>
              OVERVIEW
            </Nav.Link>
          </Nav.Item>
        ) : null}
        {categories && categories.length
          ? categories.map((a, i) => {
              return (
                <Nav.Item key={i + 1}>
                  <Nav.Link
                    eventKey={i}
                    onClick={() => addQuery("categ", a.category_id)}
                  >
                    {a.category_name}
                  </Nav.Link>
                </Nav.Item>
              );
            })
          : null}{" "}
      </Nav>
      <Nav className="justify-content-center  align-items-center" activeKey="0">
        {blog ? (
          <Nav.Item key="contact">
            <Nav.Link href={`/blog`}>Blog</Nav.Link>
          </Nav.Item>
        ) : null}
        {author && author.author_biography_fr ? (
          <Nav.Item key="bio">
            <Nav.Link onClick={() => setShow(!show)}>Profile</Nav.Link>
          </Nav.Item>
        ) : null}
        {contact && (
          <Nav.Item key="contact">
            <Nav.Link>Contact</Nav.Link>
          </Nav.Item>
        )}
        {author ? (
          <>
            <Nav.Item key="insta">
              <a
                href={author?.author_insta}
                className="nav-link"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} width="1.5em" />{" "}
              </a>
            </Nav.Item>
            <Nav.Item key="fb">
              <a href={author?.author_fb} className="nav-link" target="_blank">
                <FontAwesomeIcon icon={faFacebookSquare} width="1.5em" />{" "}
              </a>
            </Nav.Item>
          </>
        ) : null}
      </Nav>
      {author ? (
        <Biography
          show={show}
          fullscreen={fullscreen}
          setShow={setShow}
          author={author}
        ></Biography>
      ) : null}
    </div>
  );
};
