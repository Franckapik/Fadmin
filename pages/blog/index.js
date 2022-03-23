import { PostList } from "../../components/postlist";
import Layout_Home from "../../layouts/layout_home";
import prisma from "../../prisma/prisma";

export default function Blog({ db_post, db_authors, db_home }) {
  return (
    <Layout_Home authors={db_authors} db_home={db_home} contact>
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

  const db_authors = await prisma.author.findMany({
    where: {
      author_draft: false,
    },
  });

  const db_post_s = JSON.stringify(db_post_0);
  const db_post = JSON.parse(db_post_s); //serialize issue

  const db_home = await prisma.home.findUnique({
    where: {
      home_id: 1,
    },
  });

  return {
    props: { db_post, db_authors, db_home },
  };
}
