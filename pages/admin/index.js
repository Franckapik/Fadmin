import { getProviders, signIn, signOut, useSession } from "next-auth/client";
import { Button, Card, Col, Container, Nav, Row, Table } from "react-bootstrap";
import Moment from "react-moment";
import Sidebar from "../../components/sidebaradmin";
import Layout_Admin from "../../layouts/layout_admin";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Page({
  providers,
  db_medias,
  db_post,
  db_comment,
  db_author,
}) {
  const [session, loading] = useSession();
  return (
    <>
      {!session && (
        <>
          <Container>
            <Row className="text-center mt-5">
              {" "}
              <Col className="signin">
                <h2>Qualyn Admnistration</h2>
                {Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                    <Button
                      onClick={() => signIn(provider.id)}
                      className="mt-5 p-3"
                    >
                      Sign in with {provider.name}
                    </Button>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </>
      )}
      {session && (
        <>
          <Layout_Admin>
            <Row>
              <Col id="page-content-wrapper">
                <main>
                  <h2>Qualyn Dashboard</h2>
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
                              <tr key={"jenesaispas"}>
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
                                <tr key={"jenesaispas"}>
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
                        <tr key={"jenesaispas"}>
                          <td key={"a"}>
                            {db_comment[db_comment.length - 1].comment_msg}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                  <Row>
                    <Table className="mt-3">
                      <thead>
                        <tr>
                          <th>Dernier article</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={"jenesaispas"}>
                          <td
                            key={"a"}
                            dangerouslySetInnerHTML={{
                              __html:
                                db_post[db_comment.length - 1].post_html.slice(
                                  0,
                                  200
                                ) + "[...]",
                            }}
                          ></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                </main>
              </Col>
            </Row>
          </Layout_Admin>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
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

  const db_comment_0 = await prisma.comment.findMany({
    include: {
      author: true,
    },
  });

  const db_comment_s = JSON.stringify(db_comment_0);
  const db_comment = JSON.parse(db_comment_s); //serialize issue

  return {
    props: { providers, db_medias, db_post, db_comment, db_author },
  };
}
