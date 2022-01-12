import { CommentList } from "../../components/commentlist";
import Layout_Home from "../../layouts/layout_home";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Comment({ db_comment, db_authors }) {
  return (
    <Layout_Home authors={db_authors} contact>
      <CommentList commentList={db_comment}></CommentList>
    </Layout_Home>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_comment_0 = await prisma.comment.findMany({
    where: {
      comment_author_id: parseInt(query.author),
    },
    include: {
      author: true,
    },
  });

  const db_comment_s = JSON.stringify(db_comment_0);
  const db_comment = JSON.parse(db_comment_s); //serialize issue

  const db_authors = await prisma.author.findMany({
    where: {
      author_draft: false,
    },
  });

  return {
    props: { db_comment, db_authors },
  };
}
