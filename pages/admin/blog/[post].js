import { useRouter } from "next/router";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  ModalBody,
  Row,
} from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
import prisma from "../../../prisma/prisma";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import Cloud from "../../../components/cloud";

const PostAdmin = ({ db_post, db_author }) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      post_title: db_post.post_title,
      post_image: db_post.post_image,
      post_author_id: db_post.post_author_id,
      post_draft: db_post.post_draft,
    },
  });

  const [content, setContent] = useState();
  const [innerHTML, setInnerHTML] = useState();
  const [text, setText] = useState();

  const router = useRouter();
  const { post } = router.query;

  const [show, setShow] = useState(false);

  const [filesSelected, setfilesSelected] = useState(false);

  const chooseFile = (element) => {
    console.log(element);
    setfilesSelected(element);

    setShow(false);
  };
  const allFields = watch();

  const onSubmit = async (data) => {
    post !== "create" ? (data.post_id = db_post.post_id) : null;
    data.post_author_id = parseInt(data.post_author_id); //integer issue
    data.post_content = quill.getContents();
    data.post_html = innerHTML;

    filesSelected
      ? (data.post_image = filesSelected[0].url)
      : (data.post_image = db_post.post_image || 0);

    await axios
      .post("/api/blog/addPost", data)
      .then((response) => {
        console.log(response);
        router.push(
          "/admin/blog?operation=ajouté&type=article&value=" +
            response.data.post_title
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    quill?.setContents(db_post.post_content);
  }, [quill, db_post]);

  return (
    <Layout_Admin>
      <Row>
        <Col md={6}>
          {db_post ? (
            <h2 className="mb-4 text-center">
              {" "}
              Modifier l&apos;article [ n°{db_post.post_id}]
            </h2>
          ) : (
            <h2 className="mb-4 text-center"> Ajouter un article</h2>
          )}
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group className="mb-3" controlId="post_title_id">
              <Form.Label>Titre de l&apos;article</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="post_title"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.post_title}
                    placeholder="Enter media title"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.post_title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_photo_id">
              <Form.Label>Photographie(s)</Form.Label>
              <Form.Control
                onClick={() => setShow(true)}
                placeholder={filesSelected[0]?.public_id || db_post.post_image}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="post_content_id">
              <Form.Label>Contenu</Form.Label>
              <div style={{ height: 300, marginBottom: "85px" }}>
                <div ref={quillRef} />
              </div>
              <Form.Control.Feedback type="invalid">
                {" "}
                {/* no validation */}
                {errors.post_content?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="post_author_id_id">
              <Form.Label>Auteur</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="post_author_id"
                defaultValue={1}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Select
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.post_category_id}
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
                {errors.post_author_id?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="author_draft_id">
              <Form.Label>Brouillon</Form.Label>
              <Controller
                control={control}
                name="post_draft"
                defaultValue={false}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Check
                    type={"checkbox"}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.post_draft}
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
        <Col md={6}>
          <Card>
            <Card.Img
              src={allFields.post_image || filesSelected[0]?.url}
            ></Card.Img>

            <Card.Body className="text-center">
              <Card.Title className="mt-4">
                <h2>{allFields.post_title}</h2>
              </Card.Title>
              <Card.Text>
                <hr></hr>
                <h6>{text}</h6>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="modal_media">
        <Modal
          dialogClassName={"MediaModal"}
          centered
          show={show}
          onHide={() => setShow(false)}
        >
          <ModalBody>
            <Cloud chooseFile={chooseFile}></Cloud>
          </ModalBody>
        </Modal>
      </div>
    </Layout_Admin>
  );
};

export default PostAdmin;

export async function getServerSideProps({ params }) {
  let db_post_0 = 0;

  if (params?.post !== "create") {
    db_post_0 = await prisma.post.findUnique({
      where: {
        post_id: Number(params?.post) || -1,
      },
    });
  }

  const db_post_s = JSON.stringify(db_post_0);
  const db_post = JSON.parse(db_post_s); //serialize issue

  const db_author = await prisma.author.findMany();

  return {
    props: { db_post, db_author },
  };
}
