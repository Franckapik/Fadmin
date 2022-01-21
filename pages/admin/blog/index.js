import { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const BlogPage = ({ db_post }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const router = useRouter();

  const onDelete = async (data) => {
    await axios.post("/api/blog/deletePost", { id: data });
    setShow(!show);
    router.push("/admin/blog");
  };

  return (
    <Layout_Admin title={"Blog"}>
      <Row xs={1} md={4} className="g-4" key="MedList">
        <CardAdmin
          title={"Ajouter un article"}
          text={"____"}
          edit_link={"/admin/blog/0"}
          setShow={setShow}
          show={show}
          add
        ></CardAdmin>
        {db_post && db_post.length
          ? db_post.map((a, i) => {
              return (
                <CardAdmin
                  key={i}
                  all={a}
                  setSelected={setSelected}
                  title={a.post_title}
                  text={a.post_subtitle}
                  edit_link={`/admin/blog/${a.post_id}`}
                  setShow={setShow}
                  show={show}
                ></CardAdmin>
              );
            })
          : null}
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="cursor"></Modal.Header>
        <Modal.Body className="text-center">
          {" "}
          <p>
            Etes vous certain de vouloir supprimer l&apos;article{" "}
            {selected.post_title} ?
          </p>
          <Button
            variant="danger"
            className="m-3 mb-3"
            onClick={() => onDelete(selected.post_id)}
          >
            {" "}
            CONFIRMER
          </Button>
          <Button
            variant="primary"
            className="m-3 mb-3"
            onClick={() => setShow(!show)}
          >
            {" "}
            ANNULER
          </Button>
        </Modal.Body>
      </Modal>
    </Layout_Admin>
  );
};

export default BlogPage;

export async function getServerSideProps() {
  const db_post_0 = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  const db_post_s = JSON.stringify(db_post_0);
  const db_post = JSON.parse(db_post_s); //serialize issue

  return {
    props: { db_post },
  };
}
