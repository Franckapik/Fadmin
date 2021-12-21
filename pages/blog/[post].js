import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import Layout_Home from "../../layouts/layout_home";
import { useRouter } from "next/router";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Post = ({ db_post, post_length }) => {
  const [html, setHTML] = useState();

  const router = useRouter();

  console.log(post_length);
  useEffect(() => {
    db_post?.post_html && setHTML(db_post.post_html);
  }, [db_post]);

  const changeQuery = (value) => {
    router.query["post"] = parseInt(router.query.post) + parseInt(value);
    router.push(router);
  };

  return (
    <Layout_Home>
      <Row>
        <h4 className="text-center">
          <a href="/blog">Blog</a>
        </h4>
      </Row>
      <Row className="post_row ">
        {db_post && db_post.post_html ? (
          <>
            {" "}
            <Col
              md={4}
              style={{
                backgroundImage: `url("/blog/${db_post.post_image}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundOrigin: "content-box",
              }}
            >
              {db_post.post_title}
            </Col>
            <Col md={6} className="text-justify">
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
      {router.query.post < post_length.length - 1 ? (
        <FontAwesomeIcon
          icon={faChevronRight}
          width="1.5em"
          style={{
            position: "absolute",
            right: "2em",
            top: "50%",
            color: "gray",
          }}
          onClick={() => changeQuery(1)}
        />
      ) : null}

      {router.query.post > 1 ? (
        <FontAwesomeIcon
          icon={faChevronLeft}
          width="1.5em"
          style={{
            position: "absolute",
            left: "2em",
            top: "50%",
            color: "gray",
          }}
          onClick={() => changeQuery(-1)}
        />
      ) : null}
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

  const post_length = await prisma.post.findMany({
    select: {
      post_id: true,
    },
  });

  const db_post_s = JSON.stringify(db_post_0);
  const db_post = JSON.parse(db_post_s); //serialize issue

  const db_author = await prisma.author.findMany();

  return {
    props: { db_post, db_author, post_length },
  };
}
