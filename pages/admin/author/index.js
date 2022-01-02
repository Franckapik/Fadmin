import { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const AuthorPage = ({ db_author, user }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onDelete = async (data) => {
    await axios.post("/api/author/deleteAuthor", { id: data });
    setShow(!show);
    router.push("/admin/author");
  };

  return (
    <Layout_Admin title={"Authors"}>
      <Row className="mb-5 text-center">
        <Button variant="light" href={"/admin/author/0"}>
          Ajouter un artiste
        </Button>
      </Row>
      <Row xs={1} md={4} className="g-4">
        {db_author && db_author.length
          ? db_author.map((a, i) => {
              return (
                <>
                  <CardAdmin
                    title={a.author_name}
                    text={a.author_art}
                    edit_link={`/admin/author/${a.author_id}`}
                    setShow={setShow}
                    show={show}
                  ></CardAdmin>

                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton className="cursor"></Modal.Header>
                    <Modal.Body className="text-center">
                      {" "}
                      <p>
                        Etes vous certain de vouloir supprimer l'artiste{" "}
                        {a.author_name} ?
                      </p>
                      <Button
                        variant="danger"
                        className="m-3 mb-3"
                        onClick={() => onDelete(a.author_id)}
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

export default AuthorPage;

export async function getServerSideProps(ctx) {
  const db_author = await prisma.author.findMany();
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
  return {
    props: {
      user: session.user,
      db_author,
    },
  };
}
