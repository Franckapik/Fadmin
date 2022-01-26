import { CommentList } from "../../components/commentlist";
import { ContactForm } from "../../components/contactform";
import Layout_Home from "../../layouts/layout_home";
import prisma from "../../prisma/prisma";

export default function Comment({ db_authors }) {
  return (
    <Layout_Home authors={db_authors}>
      <ContactForm db_authors={db_authors}></ContactForm>
    </Layout_Home>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_authors = await prisma.author.findMany({
    where: {
      author_draft: false,
    },
  });

  return {
    props: { db_authors },
  };
}
