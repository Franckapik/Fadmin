import { useRouter } from "next/router";
import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Layout_Admin from "../../layouts/layout_admin";
import prisma from "../../prisma/prisma";
import axios from "axios";
import { useState } from "react";

export default function Page({
  db_medias,
  db_post,
  db_comment,
  db_author,
  db_home,
}) {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      home_video_url: db_home.home_video_url,
    },
  });

  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    await axios.post("/api/home/modifyVideo", data).then(
      (response) => {
        console.log(response);
        setSuccess(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Layout_Admin>
      <Row>
        <Col id="page-content-wrapper">
          <main>
            <h2>Qualyn Dashboard</h2>
            <Row>
              <Table striped borderless hover className="mt-5">
                <thead>
                  <tr>
                    <th>Accueil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={"db_home"}>
                    <td key={"video_url"}>
                      {" "}
                      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                        <Form.Group
                          className="mb-3"
                          controlId="db_home_home_video_url"
                        >
                          <Form.Label>Lien vidéo</Form.Label>
                          <InputGroup>
                            <Controller
                              control={control}
                              rules={{
                                required: "Ce champ est manquant",
                                maxLength: {
                                  value: 200,
                                  message:
                                    "Ce champ contient trop de caractères",
                                },
                              }}
                              name="home_video_url"
                              render={({
                                field: { onChange, onBlur, value, ref },
                              }) => (
                                <Form.Control
                                  onChange={onChange}
                                  value={value}
                                  ref={ref}
                                  isInvalid={errors.home_video_url}
                                  placeholder="Url of media home"
                                />
                              )}
                            />
                            <Button
                              variant={success ? "success" : "primary"}
                              type="submit"
                            >
                              Valider
                            </Button>
                          </InputGroup>
                          <Form.Control.Feedback type="invalid">
                            {errors.home_video_url?.message}
                          </Form.Control.Feedback>
                          {success ? (
                            <div className="pt-2">
                              Le nouveau lien à bien été pris en compte !
                            </div>
                          ) : null}
                        </Form.Group>
                      </Form>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <Table striped borderless hover className="mt-5">
                <thead>
                  <tr>
                    <th>Artistes</th>
                    <th>Art</th>
                    <th>Facebook</th>
                    <th>Instagram</th>
                  </tr>
                </thead>
                <tbody>
                  {db_author &&
                    db_author.map((a, i) => {
                      return (
                        <tr key={"db_author" + i}>
                          <td key={"a" + i}>{a.author_name}</td>
                          <td key={"b" + i}>{a.author_art}</td>
                          <td key={"c" + i}>{a.author_fb}</td>
                          <td key={"d" + i}>{a.author_insta}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Table striped borderless hover className="mt-5">
                <thead>
                  <tr>
                    <th>Derniers medias</th>
                    <th>Dossier</th>
                    <th>Sous-titre</th>
                    <th>Catégorie</th>
                  </tr>
                </thead>
                <tbody>
                  {db_medias &&
                    db_medias
                      .sort((a, b) => b.media_id - a.media_id)
                      .slice(0, 5)
                      .map((a, i) => {
                        return (
                          <tr key={"medias" + i}>
                            <td key={"a"}>
                              {a.media_title || a.media_subtitle}
                            </td>
                            <td key={"b"}>{a.media_folder}</td>
                            <td key={"c"}>{a.media_subtitle}</td>
                            <td key={"d"}>{a.category.category_name}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Table className="mt-3">
                <thead>
                  <tr>
                    <th>Dernier commentaire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={"last_com"}>
                    <td key={"a"}>
                      {db_comment[db_comment.length - 1].comment_msg}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              {db_post ? (
                <Table className="mt-3">
                  <thead>
                    <tr>
                      <th>Dernier article</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={"last_article"}>
                      <td
                        key={"a"}
                        dangerouslySetInnerHTML={{
                          __html:
                            db_post[db_post.length - 1].post_html.slice(
                              0,
                              200
                            ) + "[...]",
                        }}
                      ></td>
                    </tr>
                  </tbody>
                </Table>
              ) : null}
            </Row>
          </main>
        </Col>
      </Row>
    </Layout_Admin>
  );
}

export async function getServerSideProps(context) {
  const db_medias = await prisma.media.findMany({
    include: {
      category: true,
      author: true,
    },
  });

  const db_post_0 = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  const db_post_s = JSON.stringify(db_post_0);
  const db_post = JSON.parse(db_post_s); //serialize issue

  const db_author = await prisma.author.findMany();
  const db_home = await prisma.home.findUnique({
    where: {
      home_id: 1,
    },
  });

  const db_comment_0 = await prisma.comment.findMany({
    include: {
      author: true,
    },
  });

  const db_comment_s = JSON.stringify(db_comment_0);
  const db_comment = JSON.parse(db_comment_s); //serialize issue

  return {
    props: { db_medias, db_post, db_comment, db_author, db_home },
  };
}
