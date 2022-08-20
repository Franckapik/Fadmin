import axios from "axios";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useQuill } from "react-quilljs";
import Layout_Admin from "../../../layouts/layout_admin";
import prisma from "../../../prisma/prisma";

const CommentAdmin = ({ db_comment, db_author }) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment_msg: db_comment?.comment_msg,
      comment_create: db_comment?.comment_create,
      comment_author: db_comment?.comment_author,
      comment_author_id: db_comment?.comment_author_id,
      comment_draft: db_comment?.comment_draft,
    },
  });
  const [content, setContent] = useState();
  const [innerHTML, setInnerHTML] = useState();
  const [text, setText] = useState();
  const router = useRouter();
  const { comment } = router.query;

  const onSubmit = async (data) => {
    comment !== "create" ? (data.comment_id = db_comment.comment_id) : null;

    data.comment_author_id = parseInt(data.comment_author_id); //integer issue
    data.comment_msg = quill.getText();
    data.comment_create = db_comment?.create || new Date();

    await axios
      .post("/api/comment/addComment", data)
      .then((response) => {
        console.log(response);
        router.push(
          "/admin/comment?operation=ajouté&type=commentaire&value=" +
            response.data.comment_id
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allFields = watch();
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        /*         
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
         // Get innerHTML using quill
         // Get innerHTML using quillRef
 */
        setText(quill.getText());
        setInnerHTML(quill.root.innerHTML);
        /*         setContent(quill.getContents()); //error here with array ob objects for a state
         */
      });
    }
  }, [quill]);

  useEffect(() => {
    if (quill && db_comment) {
      quill?.setText(db_comment?.comment_msg);
    }
  }, [quill, db_comment]);

  return (
    <Layout_Admin>
      <Row>
        <Col>
          {db_comment && db_comment.comment_id ? (
            <h2 className="mb-4 text-center">
              {" "}
              Modérer le commentaire [ n°{db_comment.comment_id}]
            </h2>
          ) : (
            <h2 className="mb-4 text-center"> Ajouter un commentaire</h2>
          )}
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group className="mb-3" controlId="comment_author_id">
              <Form.Label>Auteur du commentaire*</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="comment_author"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.comment_author}
                    placeholder="Enter author name"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.comment_title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="comment_content_id">
              <Form.Label>Contenu</Form.Label>
              <div style={{ height: 300, marginBottom: "85px" }}>
                <div ref={quillRef} />
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.comment_content?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="comment_author_id_id">
              <Form.Label>Artiste commenté*</Form.Label>
              <Controller
                control={control}
                name="comment_author_id"
                defaultValue={1}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Select
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.comment_category_id}
                    aria-label="Default select example"
                  >
                    {db_author.map((a, i) => (
                      <option key={"author" + i} value={a.author_id}>
                        {a.author_name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.comment_author_id?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="author_draft_id">
              <Form.Label>Brouillon</Form.Label>
              <Controller
                control={control}
                name="comment_draft"
                defaultValue={false}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Check
                    type={"checkbox"}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.comment_draft}
                    placeholder="draft of the media"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author_draft?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Valider
            </Button>
          </Form>
        </Col>
        <Col>
          <Card>
            <Row>
              <Col>
                <Card.Body className="text-center">
                  <Card.Title className="mt-4">
                    <h2>{allFields.comment_author} : </h2>
                  </Card.Title>
                  <Card.Text>
                    <h6>{allFields.comment_msg}</h6>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout_Admin>
  );
};

export default CommentAdmin;

export async function getServerSideProps({ params }) {
  let db_comment_0 = 0;

  if (params?.comment !== "create") {
    //not new comment
    db_comment_0 = await prisma.comment.findUnique({
      where: {
        comment_id: Number(params?.comment),
      },
    });
  }

  const db_comment_s = JSON.stringify(db_comment_0);
  const db_comment = JSON.parse(db_comment_s); //serialize issue

  const db_author = await prisma.author.findMany();

  return {
    props: { db_comment, db_author },
  };
}
