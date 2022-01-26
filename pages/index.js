import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MediasHome } from "../components/mediashome";
import Layout_Home from "../layouts/layout_home";
import prisma from "../prisma/prisma";

export default function Home({ db_authors, mediasFiles }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Layout_Home authors={db_authors}>
      <Row>
        <Col className="mx-auto">
          <MediasHome mediasFiles={mediasFiles}></MediasHome>
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
  const mediasFiles = await prisma.media.findMany({
    where: {
      media_home: true,
    },
    include: {
      author: true,
    },
  });
  return {
    props: { db_authors, mediasFiles },
  };
}
