import { CommentList } from "../../components/commentlist";
import { ContactForm } from "../../components/contactform";
import Layout_Home from "../../layouts/layout_home";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Comment({ db_authors }) {
  return (
    <Layout_Home authors={db_authors}>
      <ContactForm db_authors={db_authors}></ContactForm>
    </Layout_Home>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_authors = await prisma.author.findMany();

  return {
    props: { db_authors },
  };
}
