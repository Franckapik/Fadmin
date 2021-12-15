import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";

export const Categories = ({ categories, blog, overview, author }) => {
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }
  console.log(author);

  const router = useRouter();

  const addQuery = (key, value) => {
    router.query[key] = value;
    router.push(router);
  };

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
            <Nav.Link>Blog</Nav.Link>
          </Nav.Item>
        ) : null}
        <Nav.Item key="contact">
          <Nav.Link>Contact</Nav.Link>
        </Nav.Item>
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
    </div>
  );
};
