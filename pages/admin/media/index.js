import { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const MediaPage = ({ db_media }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onDelete = async (data) => {
    await axios.post("/api/media/deleteMedia", { id: data });
    setShow(!show);
    router.push("/admin/media");
  };

  return (
    <Layout_Admin title={"Medias"}>
      <Row className="mb-5 text-center" key="addMed">
        <Button variant="light" href={"/admin/media/0"}>
          Ajouter un media
        </Button>
      </Row>
      <Row xs={1} md={4} className="g-4" key="MedList">
        {db_media && db_media.length
          ? db_media.map((a, i) => {
              return (
                <>
                  <CardAdmin
                    title={a.media_title}
                    text={a.media_subtitle}
                    category={a.category.category_name}
                    edit_link={`/admin/media/${a.media_id}`}
                    position={a.media_position}
                    setShow={setShow}
                    show={show}
                  ></CardAdmin>
                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton className="cursor"></Modal.Header>
                    <Modal.Body className="text-center">
                      {" "}
                      <p>
                        Etes vous certain de vouloir supprimer le media{" "}
                        {a.media_title} ?
                      </p>
                      <Button
                        variant="danger"
                        className="m-3 mb-3"
                        onClick={() => onDelete(a.media_id)}
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

export default MediaPage;

export async function getServerSideProps(ctx) {
  const db_media = await prisma.media.findMany({
    include: {
      category: true,
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

  return {
    props: { user: session.user, db_media },
  };
}
