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
                  className="text-center align-items-center no-upper comment_row"
                >
                  <Col>
                    <p className="comment">{a.comment_msg}</p>
                    <div className="comment_author">{a.comment_author}</div>
                  </Col>
                </Row>
              );
            })
        : null}
    </Container>
  );
};
