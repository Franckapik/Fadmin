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

const prisma = new PrismaClient();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ db_authors, medias, db_category }) {
  const router = useRouter();

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
        <Medias medias={medias}></Medias>
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

  console.log(db_authors);

  const medias = await Promise.all(
    db_medias.map((a, i) => {
      return fsPromises
        .readdir(
          path.join(
            getConfig().serverRuntimeConfig.PROJECT_ROOT,
            `/public/medias/2/${a.media_folder}`
          )
        )
        .then((data2) => {
          return data2.filter((f) =>
            [".jpeg", ".jpg", ".png"].includes(path.extname(f).toLowerCase())
          );
        });
    })
  );

  const db_category = await prisma.category.findMany({
    where: {
      category_author: Number(params?.author) || -1,
    },
  });

  return {
    props: { db_authors, medias, db_category },
  };
}
