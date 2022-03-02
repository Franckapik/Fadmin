import { Col, Row } from "react-bootstrap";
import { MediasHome } from "../components/mediashome";
import Layout_Home from "../layouts/layout_home";
import prisma from "../prisma/prisma";

export default function Home({ db_authors, mediasFiles, db_home }) {
  return (
    <Layout_Home authors={db_authors}>
      <Row>
        <Col className="mx-auto">
          <MediasHome mediasFiles={mediasFiles} db_home={db_home}></MediasHome>
        </Col>
      </Row>
    </Layout_Home>
  );
}

export async function getServerSideProps({ params, query }) {
  const db_authors = await prisma.author.findMany({
    where: {
      author_draft: false,
    },
  });
  const db_home = await prisma.home.findUnique({
    where: {
      home_id: 1,
    },
  });
  const mediasFiles = await prisma.media.findMany({
    where: {
      media_home: true,
    },
    include: {
      author: true,
    },
  });
  return {
    props: { db_authors, mediasFiles, db_home },
  };
}
