import fs from "fs";
import getConfig from "next/config";
import Head from "next/head";
import path from "path";
import { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import CarouselComp from "../../components/carousel";
import { Categories } from "../../components/categories";
import { Header } from "../../components/header";
import { Medias } from "../../components/medias";
const { PrismaClient } = require("@prisma/client");
const fsPromises = fs.promises;

const prisma = new PrismaClient();

export default function Home({
  db_authors,
  mediasFiles,
  db_category,
  db_author,
}) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <Container fluid className="container_main">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header authors={db_authors}></Header>
        <main>
          <Categories
            categories={db_category}
            author={db_author}
            overview
          ></Categories>

          <Medias
            mediasFiles={mediasFiles}
            setShow={setShow}
            show={show}
          ></Medias>
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton className="cursor">
              <span onClick={() => setShow(!show)}>Back</span>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <CarouselComp mediasFiles={mediasFiles}></CarouselComp>
            </Modal.Body>
          </Modal>
        </main>

        {/*         <footer className="text-center m-5 p-2">Qualyn</footer> */}
      </section>
    </Container>
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
        category: true,
      },
    });
  } else {
    db_medias = await prisma.media.findMany({
      where: {
        media_category_id: Number(query?.categ) || -1,
      },
      include: {
        author: true,
        category: true,
      },
    });
  }

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
        return 0;
      }
    })
  );

  console.log(mediasFiles);

  const db_category = await prisma.category.findMany({
    where: {
      category_author: Number(params?.author) || -1,
    },
  });

  return {
    props: { db_authors, mediasFiles, db_category, db_author },
  };
}
