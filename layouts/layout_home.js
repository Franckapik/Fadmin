import { useSession } from "next-auth/client";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { Categories } from "../components/categories";
import { Header } from "../components/header";

export default function Layout_Home({ children, author, authors, categories }) {
  return (
    <Container fluid className="container_main">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header authors={authors}></Header>
        <main>
          <Categories
            categories={categories}
            author={author}
            overview
          ></Categories>
          {children}
        </main>
      </section>
    </Container>
  );
}
