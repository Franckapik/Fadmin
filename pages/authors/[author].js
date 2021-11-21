import Head from "next/head";
import { useRouter } from "next/router";
import { Categories, Main } from "../../components/categories";
import useSWR from "swr";
import { Header } from "../../components/header";
const { PrismaClient } = require("@prisma/client");
import { server } from "../../config";
import { Medias } from "../../components/medias";

const prisma = new PrismaClient();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ author, medias }) {
  const router = useRouter();

  const { data, error } = useSWR("/api/authors/", fetcher);
  const { data: categories, error: categories_error } = useSWR(
    `${server}/api/categories/${author.author_id}`,
    fetcher
  );
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <div className="container">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header authors={data}></Header>
      <main>
        Cat
        <Categories categories={categories}></Categories>
        Med
        <Medias medias={medias}></Medias>
      </main>

      <footer>Qualyn Footer</footer>
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  const author0 = await prisma.author.findUnique({
    where: {
      author_id: Number(params?.author) || -1,
    },
  });

  const medias0 = await prisma.media.findMany({
    where: {
      media_category_id: Number(query?.categ) || -1,
    },
  });

  const author = JSON.parse(JSON.stringify(author0)); //issue with Date from PSQL with NextJS
  const medias = JSON.parse(JSON.stringify(medias0)); //issue with Date from PSQL with NextJS

  return {
    props: { author, medias },
  };
}
