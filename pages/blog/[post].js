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
import Link from "next/link";
import prisma from "../../prisma/prisma";

const Post = ({ db_post, post_length, db_author, db_home }) => {
  const [html, setHTML] = useState();

  const router = useRouter();

  useEffect(() => {
    db_post?.post_html && setHTML(db_post.post_html);
  }, [db_post]);

  const changeQuery = (value) => {
    router.query["post"] = parseInt(router.query.post) + parseInt(value);
    router.push(router);
  };

  return (
    <Layout_Home authors={db_author} db_home={db_home}>
      <Row>
        <h4 className="text-center">
          <Link href="/blog">Blog</Link>
        </h4>
      </Row>
      <Row className="post_row ">
        {db_post && db_post.post_html ? (
          <>
            {" "}
            <Col
              md={3}
              style={{
                backgroundImage: `url("/blog/${db_post.post_image}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundOrigin: "content-box",
                minHeight: "200px",
              }}
              className="mb-5"
            ></Col>
            <Col md={7} className="text-center">
              <h4 className="text-center">{db_post.post_title}</h4>
              <hr></hr>
              <Card border="0" className="p-4 no-upper">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </Card>
            </Col>
          </>
        ) : null}
      </Row>
      <Row className="text-center">
        <p className="mt-5">
          Par {db_post?.author.author_name} le{" "}
          <Moment format="DD/MM/YYYY">
            {db_post?.post_update || db_post?.post_create}
          </Moment>
        </p>
        <p className="mt-5">
          <FacebookShareButton
            url={`${process.env.DOMAIN}/blog/${router.query.post}`}
            quote={`Un article intéressant sur le blog de ${db_home.home_name}!`}
            hashtag={"#" + db_home.home_name}
          >
            <FacebookIcon size={32} round className="m-2" />
          </FacebookShareButton>
          <TwitterShareButton
            url={`${process.env.DOMAIN}/blog/${router.query.post}`}
            title={`Un article intéressant sur le blog de ${db_home.home_name}!`}
          >
            <TwitterIcon size={32} round className="m-2" />
          </TwitterShareButton>
          <PinterestShareButton
            url={`${process.env.DOMAIN}/blog/${router.query.post}`}
            media={`Un article intéressant sur le blog de ${db_home.home_name}!`}
          >
            <PinterestIcon size={32} round className="m-2" />
          </PinterestShareButton>
        </p>
      </Row>
      {router.query.post < post_length.length - 1 ? (
        <FontAwesomeIcon
          icon={faChevronRight}
          width="1.5em"
          className="cursor"
          style={{
            position: "absolute",
            right: "2em",
            top: "80%",
            color: "black",
          }}
          onClick={() => changeQuery(1)}
        />
      ) : null}

      {router.query.post > 1 ? (
        <FontAwesomeIcon
          icon={faChevronLeft}
          width="1.5em"
          className="cursor"
          style={{
            position: "absolute",
            left: "2em",
            top: "80%",
            color: "black",
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

  const db_home = await prisma.home.findUnique({
    where: {
      home_id: 1,
    },
  });

  return {
    props: { db_post, db_author, post_length, db_home },
  };
}
