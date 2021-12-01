import fs from "fs";
import { signIn, signOut, useSession } from "next-auth/client";
import getConfig from "next/config";
import path from "path";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Sidebar from "../../../components/sidebar";

const { PrismaClient } = require("@prisma/client");
const fsPromises = fs.promises;

const prisma = new PrismaClient();

export default function Page({ db_authors }) {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <>
            <Container fluid>
              <Row>
                <Sidebar></Sidebar>
                <Col xs={10}>
                  <header>
                    <Nav className="justify-content-center">
                      <Nav.Item className="m-5">
                        Bienvenue {session.user.name}
                      </Nav.Item>
                      <Nav.Item className="m-5">
                        <Button onClick={() => signOut()}>Sign out</Button>
                      </Nav.Item>
                    </Nav>
                  </header>
                  <main>
                    <Nav className="justify-content-center">
                      {db_authors && db_authors.length
                        ? db_authors.map((a, i) => {
                            return (
                              <Nav.Item key={i + 1}>
                                <Nav.Link
                                  eventKey={i}
                                  onClick={() =>
                                    addQuery("categ", a.category_id)
                                  }
                                  href={`/authors/${a.author_id}`}
                                  className="nav-authors"
                                >
                                  <h2>
                                    {" "}
                                    <p>{a.author_name}</p>{" "}
                                  </h2>
                                  <p className="thin"> {a.author_art}</p>
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })
                        : null}
                    </Nav>
                  </main>
                </Col>
              </Row>
            </Container>
          </>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_author = await prisma.author.findUnique({
    where: {
      author_id: Number(params?.author) || -1,
    },
  });

  let db_medias = [];

  if (query?.categ == 0 || typeof query["categ"] === "undefined") {
    db_medias = await prisma.media.findMany({
      where: {
        media_author_id: Number(params?.author) || -1,
      },
      include: {
        author: true,
      },
    });
  } else {
    db_medias = await prisma.media.findMany({
      where: {
        media_category_id: Number(query?.categ) || -1,
      },
      include: {
        author: true,
      },
    });
  }

  console.log(db_medias);

  const db_authors = await prisma.author.findMany();

  const mediasFiles = await Promise.all(
    db_medias.map(async (a, i) => {
      const pathFolder = `${process.env.medias_folder}/${params?.author}/${a.media_folder}`;
      const absoluteFolder = path.join(
        getConfig().serverRuntimeConfig.PROJECT_ROOT,
        pathFolder
      );
      if (fs.existsSync(absoluteFolder)) {
        const data2 = await fsPromises.readdir(absoluteFolder);
        const data3 = data2.filter((f) =>
          [".jpeg", ".jpg", ".png"].includes(path.extname(f).toLowerCase())
        );
        return {
          folder_name: a.media_folder,
          folder_path: pathFolder,
          files: data3,
          ...a,
        };
      } else {
        console.log("folder", pathFolder, "doesnt exist");
        return 0;
      }
    })
  );

  const db_category = await prisma.category.findMany({
    where: {
      category_author: Number(params?.author) || -1,
    },
  });

  return {
    props: { db_authors, mediasFiles, db_category },
  };
}
