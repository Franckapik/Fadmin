import axios from "axios";
import { traverse } from "fs-tree-utils";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  ModalBody,
  Row,
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Layout_Admin from "../../../layouts/layout_admin";
import prisma from "../../../prisma/prisma";
import FileTree from "../../../components/filetree";

const MediaAdmin = ({ db_media, db_category, db_author, folders, files }) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      media_title: db_media.media_title,
      media_photo: db_media.media_photo,
      media_video: db_media.media_video,
      media_content: db_media.media_content,
      media_link: db_media.media_link,
      media_share: db_media.media_share,
      media_category_id: db_media.media_category_id,
      media_subtitle: db_media.media_subtitle,
      media_author_id: db_media.media_author_id,
      media_home: db_media.media_home,
      media_draft: db_media.media_draft,
      media_path: db_media.media_path,
    },
  });

  const [filesSelected, setfilesSelected] = useState(false);
  const router = useRouter();
  const { media } = router.query;

  const allFields = watch();

  const [show, setShow] = useState(false);

  const chooseFile = (element) => {
    console.log(element);
    const pathFile =
      "." + element.fullname.substring(element.fullname.indexOf("/public/"));

    element.pathFile = pathFile;

    setfilesSelected(element);
    setShow(false);
  };

  const onSubmit = async (data) => {
    media !== "create" ? (data.media_id = db_media.media_id) : null;

    data.media_category_id = parseInt(data.media_category_id); //integer issue
    data.media_author_id = parseInt(data.media_author_id); //integer issue

    filesSelected
      ? (data.media_path = filesSelected.pathFile)
      : (data.media_path = db_media.media_path || 0);

    filesSelected
      ? (data.media_photo = filesSelected.name)
      : (data.media_photo = db_media.media_photo || 0);

    await axios
      .post("/api/media/addMedia", data)
      .then((response) => {
        console.log(response);
        router.push(
          "/admin/media?operation=ajouté&type=media&value=" +
            response.data.media_title
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout_Admin>
      <Row style={{ alignItems: "center" }}>
        {db_media ? (
          <h2 className="mb-4 text-center">
            {" "}
            Modifier le media [ n°{db_media.media_id}]
          </h2>
        ) : (
          <h2 className="mb-4 text-center"> Ajouter un media</h2>
        )}
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group className="mb-3" controlId="media_title_id">
              <Form.Label>Titre du media</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="media_title"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_title}
                    placeholder="Enter media title"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media_title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_photo_id">
              <Form.Label>Photographie(s)</Form.Label>
              <Form.Control
                onClick={() => setShow(true)}
                placeholder={filesSelected.fullname || db_media.media_path}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_video_id">
              <Form.Label>Video/Sound</Form.Label>
              <Controller
                control={control}
                rules={{
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="media_video"
                defaultValue=""
                render={({ field: { onChange, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    ref={ref}
                    isInvalid={errors.media_video}
                    placeholder="Enter the url of the video/sound"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media_video?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_content_id">
              <Form.Label>Contenu</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="media_content"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_content}
                    placeholder="Enter content of the media"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media_content?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_link_id">
              <Form.Label>Lien</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="media_link"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_link}
                    placeholder="Enter link of the media"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media_link?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_share_id">
              <Form.Label>Partage</Form.Label>
              <Controller
                control={control}
                rules={{
                  maxLength: {
                    value: 200,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="media_share"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_share}
                    placeholder="Facebook, Twitter, Instagram"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media_share?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_category_id_id">
              <Form.Label>Categorie</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                }}
                name="media_category_id"
                defaultValue={1}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Select
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_category_id}
                    aria-label="Default select example"
                  >
                    {db_category.map((a, i) => (
                      <option key={"categ" + i} value={a.category_id}>
                        {a.category_name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media_category_id?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_subtitle_id">
              <Form.Label>Sous-titres</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                  maxLength: {
                    value: 100,
                    message: "Ce champ contient trop de caractères",
                  },
                }}
                name="media_subtitle"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_subtitle}
                    placeholder="Enter subtitles of the media"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.media_subtitle?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_author_id_id">
              <Form.Label>Auteur</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                }}
                name="media_author_id"
                defaultValue={1}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Select
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_category_id}
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
                {errors.media_author_id?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="author_draft_id">
              <Form.Label>Visible sur l&apos;accueil</Form.Label>
              <Controller
                control={control}
                name="media_home"
                defaultValue={false}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Check
                    type={"checkbox"}
                    onChange={onChange}
                    value={value}
                    defaultChecked={db_media.media_home}
                    ref={ref}
                    isInvalid={errors.media_home}
                    placeholder="home media"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author_draft?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="author_draft_id">
              <Form.Label>Brouillon</Form.Label>
              <Controller
                control={control}
                name="media_draft"
                defaultValue={false}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Check
                    type={"checkbox"}
                    onChange={onChange}
                    value={value}
                    defaultChecked={db_media.media_draft}
                    ref={ref}
                    isInvalid={errors.media_draft}
                    placeholder="draft of the media"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author_draft?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="author_draft_id">
              <Form.Label>Miniature Large</Form.Label>
              <Controller
                control={control}
                name="media_large"
                defaultValue={false}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Check
                    type={"checkbox"}
                    onChange={onChange}
                    value={value}
                    defaultChecked={db_media.media_large}
                    ref={ref}
                    isInvalid={errors.media_large}
                    placeholder="width of the media"
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
            <Row className="text-center">
              <Card.Img
                variant="top"
                className="mx-auto"
                src={
                  allFields.media_path.replace("./public", "") ||
                  filesSelected.pathFile.replace("./public", "")
                }
              ></Card.Img>

              {allFields.media_title ? (
                <Card.Title className="mt-4">
                  <h2>{allFields.media_title}</h2>
                </Card.Title>
              ) : null}
              <Card.Text>
                <h8> {filesSelected.pathFile || allFields.media_path}</h8>
                <h6>{allFields.media_subtitle}</h6>
                <hr></hr>
                <h6>{allFields.media_content}</h6>
              </Card.Text>
            </Row>
          </Card>
        </Col>
      </Row>
      <div className="modal_media">
        <Modal show={show} onHide={() => setShow(false)}>
          <ModalBody>
            <FileTree data={files} readOnly chooseFile={chooseFile}></FileTree>
          </ModalBody>
        </Modal>
      </div>
    </Layout_Admin>
  );
};

export default MediaAdmin;

export async function getServerSideProps({ params }) {
  let db_media = 0;

  if (params?.media !== "create") {
    db_media = await prisma.media.findUnique({
      where: {
        media_id: Number(params?.media),
      },
    });
  }

  const db_category = await prisma.category.findMany();
  const db_author = await prisma.author.findMany();
  const db_medias = await prisma.media.findMany();

  const deep = ({ item }) => item !== "Old";
  const files0 = await traverse("." + process.env.medias_folder, { deep });
  const containers = files0.map((a) =>
    a.container.slice(a.container.lastIndexOf("/medias"))
  );
  const folders = [...new Set(containers)];

  const { data: files } = await axios.get(
    process.env.DOMAIN + `/api/explorer/list`
  );

  return {
    props: { db_media, db_category, db_author, db_medias, folders, files },
  };
}
