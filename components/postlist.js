import { useRouter } from "next/router";
import React from "react";
import { Card, Container } from "react-bootstrap";

export const PostList = ({ postList }) => {
  const router = useRouter();

  const addQuery = (key, value) => {
    router.query[key] = value;
    router.push(router);
  };

  return (
    <Container fluid className="d-flex justify-content-center flex-wrap ">
      {" "}
      {/*justify-content-between */}
      {postList && postList != 0
        ? postList.map((a, i) => {
            return (
              <>
                <a href={`/blog/${a.post_id}`}>
                  <Card border="0" className="cursor mx-auto m-3" key={i}>
                    <Card.Body
                      className="fade-short rounded no-hover"
                      style={{
                        padding: 0,
                        margin: "auto",
                        height: "20vw",
                        width: "20vw",
                        backgroundImage:
                          a.post_image ||
                          `url(${a.folder_path.substr(7) + "/" + a.files[0]})`,
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
              </>
            );
          })
        : null}{" "}
    </Container>
  );
};
