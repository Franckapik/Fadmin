import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";

import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
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
      <Row className="post_row ">
        {db_post && db_post.post_html ? (
          <>
            {" "}
            <Col
              md={4}
              style={{
                backgroundImage: `url("/blog/femme.png")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundOrigin: "content-box",
              }}
            >
              {db_post.post_title}
            </Col>
            <Col md={7} className="text-justify">
              <h4 className="text-center">{db_post.post_title}</h4>
              <hr></hr>
              <Card border="0" className="p-4 ">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </Card>
            </Col>
          </>
        ) : null}
      </Row>
      <Row className="text-center">
        <p className="mt-5">
          Par <strong>{db_post.author.author_name}</strong> le{" "}
          <Moment format="DD/MM/YYYY">
            {db_post.post_update || db_post.post_create}
          </Moment>
        </p>
        <p className="mt-5">
          <FacebookShareButton
            url={"https://github.com/next-share"}
            quote={"Un article intéressant sur le blog de Qualyn!"}
            hashtag={"#nextshare"}
          >
            <FacebookIcon size={32} round className="m-2" />
          </FacebookShareButton>
          <TwitterShareButton
            url={"https://github.com/next-share"}
            title={"Un article intéressant sur le blog de Qualyn!"}
          >
            <TwitterIcon size={32} round className="m-2" />
          </TwitterShareButton>
          <PinterestShareButton
            url={"https://github.com/next-share"}
            media={"Un article intéressant sur le blog de Qualyn!"}
          >
            <PinterestIcon size={32} round className="m-2" />
          </PinterestShareButton>
        </p>
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
