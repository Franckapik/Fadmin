import { useRouter } from "next/router";
import React from "react";
import { Card, Container } from "react-bootstrap";

export const PostList = ({ postList }) => {
  const router = useRouter();

  return (
    <Container fluid className="d-flex justify-content-center flex-wrap ">
      {" "}
      {/*justify-content-between */}
      {postList && postList != 0
        ? postList.map((a, i) => {
            return (
              <a href={`/blog/${a.post_id}`} key={"post" + i}>
                <Card border="0" className="cursor m-3">
                  <Card.Body
                    className="fade-short rounded no-hover blog_card"
                    style={{
                      backgroundImage: `url("${a.post_image}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="square "></div>
                  </Card.Body>
                  <Card.Footer>
                    <h5>{a.post_title}</h5>
                  </Card.Footer>
                </Card>
              </a>
            );
          })
        : null}{" "}
    </Container>
  );
};
