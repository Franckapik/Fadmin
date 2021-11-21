import Head from "next/head";
import { useRouter } from "next/router";
import { Main } from "../../components/categories";
import useSWR from "swr";
import { Header } from "../../components/header";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ author }) {
  const router = useRouter();

  const { data, error } = useSWR("/api/authors/", fetcher);
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  data && console.log(data);
  console.log(author);

  return (
    <div className="container">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header authors={data}></Header>
      <main>
        {author.author_name}
        <Main categories={[1, 2]}></Main>
      </main>

      <footer>Qualyn Footer</footer>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const allUsers = await prisma.author.findUnique({
    where: {
      author_id: Number(params?.author),
    },
  });

  const author = JSON.parse(JSON.stringify(allUsers)); //issue with Date from PSQL with NextJS

  return {
    props: { author },
  };
}
