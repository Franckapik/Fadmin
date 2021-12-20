import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Layout_Home from "../../layouts/layout_home";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Post = ({ db_post }) => {
  const [html, setHTML] = useState();
  useEffect(() => {
    db_post?.post_html && setHTML(db_post.post_html);
  }, [db_post]);

  return (
    <Layout_Home>
      <Row className="post_row">
        {db_post && db_post.post_html ? (
          <>
            {" "}
            <Col
              style={{
                backgroundColor: "red",
                backgroundImage: `url("/blog/femme.png")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
              }}
            >
              {db_post.post_title}
            </Col>
            <Col className="text-center p-5">
              <p>Blog</p>
              <h4>{db_post.post_title}</h4>
              <hr></hr>
              <p dangerouslySetInnerHTML={{ __html: html }}></p>
              <p>
                Par <strong>{db_post.author.author_name}</strong> le{" "}
                <Moment format="DD/MM/YYYY">
                  {db_post.post_update || db_post.post_create}
                </Moment>
              </p>
              <p></p>
            </Col>
          </>
        ) : null}
      </Row>
    </Layout_Home>
  );
};

export default Post;

export async function getServerSideProps({ params }) {
  const db_post_0 = await prisma.post.findUnique({
    where: {
      post_id: Number(params?.post) || -1,
    },
    include: {
      author: true,
    },
  });

  const db_post_s = JSON.stringify(db_post_0);
  const db_post = JSON.parse(db_post_s); //serialize issue

  const db_author = await prisma.author.findMany();

  return {
    props: { db_post, db_author },
  };
}
