import { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { getSession } from "next-auth/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const CommentPage = ({ db_comment }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onDelete = async (data) => {
    await axios.comment("/api/comment/deletecomment", { id: data });
    setShow(!show);
    router.push("/admin/comment");
  };

  console.log(db_comment);

  return (
    <Layout_Admin title={"Comments"}>
      <Row className="mb-5 text-center" key="addMed">
        <Button variant="light" href={"/admin/comment/0"}>
          Ajouter un commentaire
        </Button>
      </Row>
      <Row xs={1} md={4} className="g-4" key="ComList">
        {db_comment && db_comment.length
          ? db_comment.map((a, i) => {
              return (
                <>
                  <CardAdmin
                    title={a.comment_author}
                    text={a.comment_msg}
                    edit_link={`/admin/comment/${a.comment_id}`}
                    setShow={setShow}
                    show={show}
                  ></CardAdmin>
                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton className="cursor"></Modal.Header>
                    <Modal.Body className="text-center">
                      {" "}
                      <p>
                        Etes vous certain de vouloir supprimer le commentaire de{" "}
                        {a.comment_author} ?
                      </p>
                      <Button
                        variant="danger"
                        className="m-3 mb-3"
                        onClick={() => onDelete(a.comment_id)}
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
                </>
              );
            })
          : null}
      </Row>
    </Layout_Admin>
  );
};

export default CommentPage;

export async function getServerSideProps(ctx) {
  const db_comment_0 = await prisma.comment.findMany({
    include: {
      author: true,
    },
  });

  const session = await getSession(ctx);
  //if no session found(user hasn’t logged in)
  if (!session) {
    return {
      redirect: {
        destination: "/admin/", //redirect user to homepage
        permanent: false,
      },
    };
  }

  const db_comment_s = JSON.stringify(db_comment_0);
  const db_comment = JSON.parse(db_comment_s); //serialize issue

  return {
    props: { user: session.user, db_comment },
  };
}
