import fs from "fs";
import getConfig from "next/config";
import path from "path";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import CarouselComp from "../../components/carousel";
import { Medias } from "../../components/mediaslist";
import Layout_Home from "../../layouts/layout_home";
const fsPromises = fs.promises;

import prisma from "../../prisma/prisma";

export default function Home({
  db_authors,
  mediasFiles,
  db_category,
  db_author,
  db_medias,
  db_home,
}) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [mediaSelected, setmediaSelected] = useState();

  return (
    <Layout_Home
      authors={db_authors}
      categories={db_category}
      author={db_author}
      contact
      comment
      overview
      db_home={db_home}
    >
      <Medias
        db_medias={db_medias}
        setShow={setShow}
        show={show}
        setmediaSelected={setmediaSelected}
        db_home={db_home}
      ></Medias>
      {/*only one modal*/}
      <Modal
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
        mediaSelected={mediaSelected}
      >
        <Modal.Header closeButton className="cursor">
          <span onClick={() => setShow(!show)}>Back</span>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <CarouselComp
            db_medias={db_medias}
            mediasFiles={mediasFiles}
            mediaSel={mediaSelected}
          ></CarouselComp>
        </Modal.Body>
      </Modal>
    </Layout_Home>
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
        media_draft: false,
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
        media_draft: false,
      },
      include: {
        author: true,
        category: true,
      },
    });
  }

  const db_authors = await prisma.author.findMany({
    where: {
      author_draft: false,
    },
  });

  const mediasFiles = await Promise.all(
    db_medias.map(async (a, i) => {
      const pathFolder = path.dirname(
        a.media_path.replace("./public/", "/public/")
      );

      const absoluteFolder = path.join(
        getConfig().serverRuntimeConfig.PROJECT_ROOT,
        pathFolder
      );
      if (fs.existsSync(absoluteFolder)) {
        const files = await fsPromises.readdir(absoluteFolder);
        return {
          folder_path: pathFolder,
          files: files.filter((f) =>
            [".jpeg", ".jpg", ".png"].includes(path.extname(f).toLowerCase())
          ),
          ...a,
        };
      } else {
        return 0;
      }
    })
  );

  const db_home = await prisma.home.findUnique({
    where: {
      home_id: 1,
    },
  });

  const db_category = await prisma.category.findMany({
    where: {
      category_author: Number(params?.author) || -1,
      category_draft: false,
    },
  });

  return {
    props: {
      db_authors,
      mediasFiles,
      db_category,
      db_author,
      db_medias,
      db_home,
    },
  };
}
