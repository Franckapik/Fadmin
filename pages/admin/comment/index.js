import axios from "axios";
import { useRouter } from "next/dist/client/router";
import "quill/dist/quill.snow.css";
import { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { AlertValidation } from "../../../components/alertValidation";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import prisma from "../../../prisma/prisma";

const CommentPage = ({ db_comment }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const router = useRouter();
  const { operation, type, value } = router.query;

  const onDelete = async (data) => {
    await axios
      .post("/api/comment/deleteComment", { id: data })
      .then((response) => {
        console.log(response);
        setShow(!show);
        router.push(
          "/admin/comment?operation=supprimé&type=commentaire&value=" +
            response.data.comment_id
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout_Admin title={"Comments"}>
      <AlertValidation
        operation={operation}
        value={value}
        type={type}
      ></AlertValidation>
      <Row xs={1} md={4} className="g-4" key="ComList">
        <CardAdmin
          title={"Ajouter un commentaire"}
          text={"____"}
          edit_link={"/admin/comment/create"}
          setShow={setShow}
          show={show}
          add
        ></CardAdmin>
        {db_comment && db_comment.length
          ? db_comment.map((a, i) => {
              return (
                <div key={"comment" + i}>
                  <CardAdmin
                    all={a}
                    setSelected={setSelected}
                    title={a.comment_author}
                    text={
                      a.comment_msg.length > 100
                        ? a.comment_msg.substring(0, 100) + " [...]"
                        : a.comment_msg
                    }
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
                        {selected.comment_author} ?
                      </p>
                      <Button
                        variant="danger"
                        className="m-3 mb-3"
                        onClick={() => onDelete(selected.comment_id)}
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
                </div>
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

  const db_comment_s = JSON.stringify(db_comment_0);
  const db_comment = JSON.parse(db_comment_s); //serialize issue

  return {
    props: { db_comment },
  };
}
