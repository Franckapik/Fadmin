import Head from "next/head";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Header } from "../../components/header";
import { PostList } from "../../components/postlist";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Home({ db_post, db_authors }) {
  return (
    <Container fluid className="container_main">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header authors={db_authors}></Header>
        <main>
          <PostList postList={db_post}></PostList>
        </main>
      </section>
    </Container>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_post = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  const db_authors = await prisma.author.findMany();

  return {
    props: { db_post, db_authors },
  };
}
