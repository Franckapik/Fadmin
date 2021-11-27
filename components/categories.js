import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";

export const Categories = ({ categories }) => {
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  const router = useRouter();

  const addQuery = (key, value) => {
    router.query[key] = value;
    router.push(router);
  };

  return (
    <>
      <Nav className="justify-content-center">
        <Nav.Item key="0">
          <Nav.Link eventKey="0" onClick={() => addQuery("categ", 0)}>
            OVERVIEW
          </Nav.Link>
        </Nav.Item>
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
      <Nav className="justify-content-center" activeKey="0">
        <Nav.Item key="contact">
          <Nav.Link>Contact</Nav.Link>
        </Nav.Item>
        <Nav.Item key="insta">
          <Nav.Link>
            <FontAwesomeIcon icon={faInstagram} width="1.5em" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
