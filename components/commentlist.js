import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";

export const CommentList = ({ commentList }) => {
  const router = useRouter();

  return (
    <Container fluid>
      {commentList && commentList != 0
        ? commentList
            .sort((a, b) => b.comment_id - a.comment_id)
            .map((a, i) => {
              return (
                <Row
                  key={"comment" + i}
                  className="p-5 text-center align-items-center mt-5 no-upper"
                >
                  <Col md={2} className="quote-t ">
                    “
                  </Col>
                  <Col md={8} style={{ fontSize: "1em" }}>
                    <p className="comment">{a.comment_msg}</p>
                    <div style={{ textAlign: "right", paddingTop: "15px" }}>
                      <strong>{a.comment_author}</strong>, le{" "}
                      <Moment format="DD/MM/YYYY">{a.comment_create}</Moment>
                    </div>
                  </Col>
                  <Col md={2} className="quote-b">
                    ”
                  </Col>
                </Row>
              );
            })
        : null}
    </Container>
  );
};
