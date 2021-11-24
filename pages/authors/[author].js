import Head from "next/head";
import { useRouter } from "next/router";
import { Categories, Main } from "../../components/categories";
import useSWR from "swr";
import { Header } from "../../components/header";
const { PrismaClient } = require("@prisma/client");
import { server } from "../../config";
import { Medias } from "../../components/medias";
const fsPromises = fs.promises;
import fs from "fs";
import path from "path";
import getConfig from "next/config";
import CarouselComp from "../../components/carousel";
import { Modal } from "react-bootstrap";
import { useState } from "react";

const prisma = new PrismaClient();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ db_authors, mediasFiles, db_category }) {
  const router = useRouter();
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <div className="container">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header authors={db_authors}></Header>
      <main>
        Cat
        <Categories categories={db_category}></Categories>
        Med
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
          <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <CarouselComp mediasFiles={mediasFiles}></CarouselComp>
          </Modal.Body>
        </Modal>
      </main>

      <footer>Qualyn Footer</footer>
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_author = await prisma.author.findUnique({
    where: {
      author_id: Number(params?.author) || -1,
    },
  });

  const author = JSON.parse(JSON.stringify(db_author)); //issue with Date from PSQL with NextJS

  const db_medias = await prisma.media.findMany({
    where: {
      media_category_id: Number(query?.categ) || -1,
    },
  });

  const db_authors = await prisma.author.findMany();

  const mediasFiles = await Promise.all(
    db_medias.map(async (a, i) => {
      const pathFolder = `${process.env.medias_folder}/${params?.author}/${a.media_folder}`;
      const absoluteFolder = path.join(
        getConfig().serverRuntimeConfig.PROJECT_ROOT,
        pathFolder
      );
      console.log(absoluteFolder);
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

  console.log(mediasFiles);

  const db_category = await prisma.category.findMany({
    where: {
      category_author: Number(params?.author) || -1,
    },
  });

  return {
    props: { db_authors, mediasFiles, db_category },
  };
}
