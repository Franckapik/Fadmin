import { useRouter } from "next/router";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";

import prisma from "../../../prisma/prisma";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { traverse } from "fs-tree-utils";

const MediaAdmin = ({
  db_media,
  db_category,
  db_author,
  db_medias,
  folders,
}) => {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      media_title: db_media.media_title,
      media_photo: db_media.media_photo,
      media_video: db_media.media_video,
      media_content: db_media.media_content,
      media_link: db_media.media_link,
      media_share: db_media.media_share,
      media_category_id: db_media.media_category_id,
      media_folder: db_media.media_folder,
      media_subtitle: db_media.media_subtitle,
      media_author_id: db_media.media_author_id,
      media_home: db_media.media_home,
      media_draft: db_media.media_draft,
      media_path: db_media.media_path,
    },
  });

  const [image, setImage] = useState(null);
  const [filesSelected, setfilesSelected] = useState(false);
  const [path, setPath] = useState(false);
  const router = useRouter();

  const allFields = watch();

  //refaire d'ici
  useEffect(() => {
    setPath(`/medias/${allFields.media_author_id}/${allFields.media_folder}/`);
  }, [allFields]);

  const uploadToServer = async (files) => {
    const body = new FormData();
    body.append("path", allFields.media_folder);
    Object.keys(files).map((i) => {
      body.append("file", files[i]);
    });

    /*     body.append("file", image);
     */ body.append("chemin", allFields.media_folder);
    return await axios.post("/api/media/upload", body).then(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  };

  const onChangeFiles = (event) => {
    //when selecting files on local
    const e = event.target.files;

    if (e && e[0]) {
      setImage(e);
      console.log(e);
      setfilesSelected(event.target.files);
    } else {
      console.log("No file selected");
    }
  };

  const onSubmit = async (data) => {
    data.media_id = db_media.media_id || 0; //id
    data.media_category_id = parseInt(data.media_category_id); //integer issue
    data.media_author_id = parseInt(data.media_author_id); //integer issue

    if (filesSelected) {
      uploadToServer(filesSelected).then((response) => {
        /*         data.media_path = response.data.newFile;
         console.log(data.media_path);*/
      }),
        (error) => {
          console.log(error);
        };
      /*       data.media_path = path + image?.name.replace(/\.[^/.]+$/, "") + ".jpg"; //new upload
       */
    } else {
      data.media_path = db_media.media_path || 0; //original db
    } /* router.push("/admin/media"); */

    /*     await axios.post("/api/media/addMedia", data);
     */
  };

  // a là! C'est quoi path et image ? faire plus simple

  return (
    <Layout_Admin>
      <Row>
        <Col>
          {db_media ? (
            <h2 className="mb-4 text-center">
              {" "}
              Modifier le media [ n°{db_media.media_id}]
            </h2>
          ) : (
            <h2 className="mb-4 text-center"> Ajouter un media</h2>
          )}
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group className="mb-3" controlId="media_title_id">
              <Form.Label>Titre du media</Form.Label>
              <Controller
                control={control}
                name="media_title"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
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

              <Controller
                control={control}
                name="media_photo"
                defaultValue="photo"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    type="file"
                    multiple
                    onChange={onChangeFiles}
                    ref={ref}
                    isInvalid={errors.media_photo}
                    placeholder="Enter photography"
                  />
                )}
              />
              <small>{allFields.media_photo}</small>

              <Form.Control.Feedback type="invalid">
                {errors.media_photo?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_video_id">
              <Form.Label>Video/Sound</Form.Label>
              <Controller
                control={control}
                name="media_video"
                defaultValue="video"
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                name="media_content"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                name="media_link"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                name="media_share"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                name="media_category_id"
                defaultValue={1}
                render={({ field: { onChange, onBlur, value, ref } }) => (
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

            <Form.Group className="mb-3" controlId="media_folder_id">
              <Form.Label>Selection du dossier</Form.Label>

              <Controller
                control={control}
                name="media_folder"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Select
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.media_folder}
                  >
                    {folders.map((a, i) => (
                      <option key={"folder" + i} value={a}>
                        {a}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />

              <Form.Control.Feedback type="invalid">
                {errors.media_folder?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="media_subtitle_id">
              <Form.Label>Sous-titres</Form.Label>
              <Controller
                control={control}
                name="media_subtitle"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                name="media_author_id"
                defaultValue={1}
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Check
                    type={"checkbox"}
                    onChange={onChange}
                    value={value}
                    defaultChecked={db_media.media_home}
                    ref={ref}
                    isInvalid={errors.media_draft}
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
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Check
                    type={"checkbox"}
                    onChange={onChange}
                    value={value}
                    defaultChecked={db_media.media_large}
                    ref={ref}
                    isInvalid={errors.media_draft}
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
              {/* <Card.Img
                variant="top"
                className="mx-auto"
                src={
                 allFields.media_path ||  URL.createObjectURL(
                    filesSelected[0]
                  ) 
                }
              ></Card.Img>*/}

              {allFields.media_title ? (
                <Card.Title className="mt-4">
                  <h2>{allFields.media_title}</h2>
                </Card.Title>
              ) : null}
              {allFields.media_content ? (
                <Card.Text>
                  <h5>
                    {" "}
                    {allFields.media_folder + "/" + allFields.media_photo}{" "}
                    {/* entire path from form */}
                  </h5>
                  <h6>{allFields.media_subtitle}</h6>
                  <hr></hr>
                  <h6>{allFields.media_content}</h6>
                </Card.Text>
              ) : null}
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout_Admin>
  );
};

export default MediaAdmin;

export async function getServerSideProps({ params }) {
  let db_media = 0;

  if (params?.media !== "0") {
    db_media = await prisma.media.findUnique({
      where: {
        media_id: Number(params?.media) || -1,
      },
    });
  }

  const db_category = await prisma.category.findMany();
  const db_author = await prisma.author.findMany();
  const db_medias = await prisma.media.findMany();

  const deep = ({ item }) => item !== "Old";
  const files0 = await traverse("." + process.env.medias_folder, { deep });
  const containers = files0.map((a, i) =>
    a.container.slice(a.container.lastIndexOf("/medias"))
  );
  const folders = [...new Set(containers)];

  return {
    props: { db_media, db_category, db_author, db_medias, folders },
  };
}
