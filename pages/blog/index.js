import { PostList } from "../../components/postlist";
import Layout_Home from "../../layouts/layout_home";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Home({ db_post, db_authors }) {
  return (
    <Layout_Home authors={db_authors} contact>
      <PostList postList={db_post}></PostList>
    </Layout_Home>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_post_0 = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  const db_authors = await prisma.author.findMany();

  const db_post_s = JSON.stringify(db_post_0);
  const db_post = JSON.parse(db_post_s); //serialize issue

  return {
    props: { db_post, db_authors },
  };
}
