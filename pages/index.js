import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import prisma from "../prisma/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home({ author, home, category, media, post, comment }) {
  const fillDB = async () => {
    await axios
      .get("/api/home/prefill")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Col md={12} className="mx-auto">
        <Row className="m-5 ">
          <Button href="/admin/">Admin Dashboard</Button>
        </Row>
        <Row>
          {home && home.length ? (
            <Container>
              <Card className="p-3 mb-3 card-w">
                <Card.Title>Home : {home[0].home_name} </Card.Title>
                <Row>
                  <Col md={4}>
                    <img
                      width={"150em"}
                      src={home[0].home_logo}
                      alt="Logo of artist"
                    ></img>
                  </Col>
                  <Col md={8}>
                    {" "}
                    <Card.Body>
                      {" "}
                      <ul>
                        <li>
                          <i className="fas fa-envelope p-3"></i>
                          {home[0].home_mail}
                        </li>
                        <li>
                          <i className="fab fa-facebook-f p-3"></i>
                          {home[0].home_fb}
                        </li>
                        <li>
                          <i className="fab fa-instagram p-3"></i>
                          {home[0].home_insta}
                        </li>
                      </ul>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>

              <Card className="p-3 mb-3 card-w ">
                <Card.Title>Artist : {author[0].author_name}</Card.Title>
                <Card.Body>
                  <div>Art/Performance : {author[0].author_art}</div>
                  <div>
                    <i className="fas fa-flag-usa p-3"></i>Biography :{" "}
                    {author[0].author_biography_en}
                  </div>
                  <div>
                    <i className="fas fa-croissant p-3"></i> Biographie :{" "}
                    {author[0].author_biography_fr}
                  </div>
                  <ul>
                    {" "}
                    <li>
                      <i className="fad fa-toolbox"></i>
                      <i className="fas fa-envelope p-3"></i>
                      {author[0].author_email}
                    </li>
                    <li>
                      <i className="fab fa-facebook-f p-3"></i>
                      {author[0].author_fb}
                    </li>
                    <li>
                      <i className="fab fa-instagram p-3"></i>
                      {author[0].author_insta}
                    </li>
                  </ul>
                </Card.Body>

                <Card className="p-3 m-2 card-w">
                  <Card.Title>
                    Category : {category[0].category_name}
                  </Card.Title>
                  <Card.Body>{category[0].category_description}</Card.Body>

                  <Card className="p-3 m-2 card-w">
                    <Card.Title>Media : {media[0].media_title}</Card.Title>
                    <Card.Body>
                      <Row>
                        <Col>
                          <img
                            src={media[0].media_path}
                            alt="my favorite animal"
                            width={"300px"}
                          ></img>
                        </Col>
                        <Col>{media[0].media_subtitle}</Col>
                      </Row>
                      <div>{media[0].media_content}</div>
                      <div>Ajouté le {media[0].media_created}</div>
                    </Card.Body>
                  </Card>
                </Card>
              </Card>
              <Card className="p-3 mb-3 card-w">
                <Card.Title>Post : {post[0].post_title}</Card.Title>
                <Card.Body>
                  <img
                    src={post[0].post_image}
                    alt="my favorite animal"
                    width={"200px"}
                  ></img>{" "}
                  <div>{post[0].post_content}</div>
                  <div>Mis à jour le {post[0].post_update}</div>
                </Card.Body>
              </Card>
              <Card className="p-3 card-w">
                <Card.Title>Comment : {comment[0].comment_author}</Card.Title>
                <Card.Body>
                  {comment[0].comment_msg}
                  le {comment[0].comment_create}
                </Card.Body>
              </Card>
            </Container>
          ) : (
            <Button onClick={() => fillDB()}>Pre-Fill Database</Button>
          )}
        </Row>
      </Col>
    </Container>
  );
}

export async function getServerSideProps({ params, query }) {
  const author = await prisma.author.findMany({});
  const home = await prisma.home.findMany({});
  const category = await prisma.category.findMany({});
  const media = await prisma.media.findMany({});
  const comment = await prisma.comment.findMany({});
  const post = await prisma.post.findMany({});

  return {
    props: { author, home, category, media, post, comment },
  };
}
