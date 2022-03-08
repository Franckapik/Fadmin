import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Moment from "react-moment";

export const ContactForm = ({ db_authors }) => {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    await axios.post("/api/contact/sendmail", data);
    setSuccess(true);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center  align-items-center">
        <Col md={8} className="mt-5">
          {!success ? (
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Form.Group className="mb-3" controlId="comment_author_id_id">
                <Form.Label>Contact</Form.Label>
                <Controller
                  control={control}
                  name="author_email"
                  defaultValue={db_authors[0].author_email}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Select
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.author_email}
                      aria-label="Default select example"
                    >
                      {db_authors.map((a, i) => (
                        <option key={"authors" + i} value={a.author_email}>
                          {a.author_name} / {a.author_art}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment_author_id?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="msg_name_id">
                <Form.Label>Name</Form.Label>
                <Controller
                  control={control}
                  rules={{
                    required: "Ce champ est manquant",
                    maxLength: {
                      value: 200,
                      message: "Ce champ contient trop de caractères",
                    },
                  }}
                  name="mail_author"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.mail_author}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment_title?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="msg_email_id">
                <Form.Label>Email</Form.Label>
                <Controller
                  control={control}
                  rules={{
                    required: "Ce champ est manquant",
                    pattern: {
                      value: "^w+([-+.']w+)*@w+([-.]w+)*.w+([-.]w+)*$",
                      message: "Un email est requis",
                    },
                  }}
                  name="mail_email"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      type="email"
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.mail_email}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment_title?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="msg_content_id">
                <Form.Label>Your message</Form.Label>
                <Controller
                  control={control}
                  rules={{
                    required: "Ce champ est manquant",
                    maxLength: {
                      value: 4000,
                      message: "Ce champ contient trop de caractères",
                    },
                  }}
                  name="mail_content"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      isInvalid={errors.mail_content}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment_content?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="text-center">
                <Button variant="outline-dark" type="submit">
                  <span className="p-3">SEND</span>
                </Button>
              </div>
            </Form>
          ) : (
            <div className="text-center">
              {" "}
              <p>Thank you for your message!</p>
              <Button variant="outline-dark" className="m-3 mb-3" href={"/"}>
                BACK TO HOMEPAGE
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
