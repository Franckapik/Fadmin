import { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

import prisma from "../../../prisma/prisma";
import { AlertValidation } from "../../../components/alertValidation";

const AuthorPage = ({ db_author, user }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const router = useRouter();
  const { operation, type, value } = router.query;

  const onDelete = async (data) => {
    await axios
      .post("/api/author/deleteAuthor", { id: data })
      .then((response) => {
        console.log(response);
        setShow(!show);
        router.push(
          "/admin/author?operation=supprimé&type=artiste&value=" +
            response.data.author_name
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout_Admin title={"Authors"}>
      <AlertValidation
        operation={operation}
        value={value}
        type={type}
      ></AlertValidation>

      <Row xs={1} md={4} className="g-4">
        <CardAdmin
          title={"Ajouter un artiste"}
          text={"____"}
          edit_link={"/admin/author/create"}
          setShow={setShow}
          show={show}
          add
        ></CardAdmin>

        {db_author && db_author.length
          ? db_author.map((a, i) => {
              return (
                <CardAdmin
                  key={"db_author" + i}
                  all={a}
                  setSelected={setSelected}
                  title={a.author_name}
                  text={a.author_art}
                  edit_link={`/admin/author/${a.author_id}`}
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
            Etes vous certain de vouloir supprimer l&apos;artiste{" "}
            {selected.author_name} ?
          </p>
          <Button
            variant="danger"
            className="m-3 mb-3"
            onClick={() => onDelete(selected.author_id)}
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

export default AuthorPage;

export async function getServerSideProps(ctx) {
  const db_author = await prisma.author.findMany();

  return {
    props: { db_author },
  };
}
