import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Moment from "react-moment";

export const CommentList = ({ commentList }) => {
  const [show, setShow] = useState(false);

  const {
    setError,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    data.comment_author_id = parseInt(2); //integer issue
    data.comment_create = new Date();
    data.comment_draft = true;

    await axios.post("/api/comment/addComment", data);
    setSuccess(true);
  };

  return (
    <Container fluid>
      {commentList && commentList != 0
        ? commentList
            .sort((a, b) => b.comment_id - a.comment_id)
            .map((a, i) => {
              return (
                <>
                  <Row className="p-5 text-center align-items-center mt-5 no-upper">
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
                </>
              );
            })
        : null}
      <div className="addcomment text-center">
        <p>
          <small>Add a comment</small>
        </p>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="m-2 cursor "
          onClick={() => setShow(!show)}
          width="5em"
        />
      </div>
      <Modal
        className="modal_comment"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton className="cursor mb-4 ">
          Add a comment{" "}
        </Modal.Header>
        <Modal.Body>
          {" "}
          {!success ? (
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Form.Group className="mb-3" controlId="comment_author_id">
                <Form.Label>Name</Form.Label>
                <Controller
                  control={control}
                  name="comment_author"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.comment_author}
                      placeholder="Your name, firstname or pseudonym"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment_title?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="comment_msg_id">
                <Form.Label>Your message</Form.Label>
                <Controller
                  control={control}
                  name="comment_msg"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.comment_msg}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment_content?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="text-center">
                <Button variant="danger" type="submit">
                  Envoyer
                </Button>
                <Button
                  variant="primary"
                  className="m-3 mb-3"
                  onClick={() => setShow(!show)}
                >
                  {" "}
                  Fermer
                </Button>
              </div>
            </Form>
          ) : (
            <div className="text-center">
              {" "}
              <p>Thank you for your comment!</p>
              <Button
                variant="primary"
                className="m-3 mb-3"
                onClick={() => setShow(!show)}
              >
                Fermer
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};
