import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { AlertValidation } from "../../../components/alertValidation";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import prisma from "../../../prisma/prisma";

const MediaPage = ({ db_media }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const router = useRouter();

  const { operation, type, value } = router.query;
  const [alert, setAlert] = useState(true);

  const onDelete = async (data) => {
    await axios
      .post("/api/media/deleteMedia", { id: data })
      .then((response) => {
        console.log(response);
        setShow(!show);
        router.push(
          "/admin/media?operation=supprimé&type=media&value=" +
            response.data.media_title
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout_Admin title={"Medias"}>
      <Row>
        <AlertValidation
          operation={operation}
          value={value}
          type={type}
        ></AlertValidation>
      </Row>
      <Row xs={1} md={4} className="g-4" key="MedList">
        <CardAdmin
          title={"Ajouter un média"}
          text={"____"}
          edit_link={"/admin/media/create"}
          setShow={setShow}
          show={show}
          add
        ></CardAdmin>
        {db_media && db_media.length
          ? db_media.map((a, i) => {
              return (
                <CardAdmin
                  key={i}
                  all={a}
                  setSelected={setSelected}
                  title={a.media_title}
                  text={a.media_subtitle}
                  category={a.category.category_name}
                  edit_link={`/admin/media/${a.media_id}`}
                  position={a.media_position}
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
            Etes vous certain de vouloir supprimer le media{" "}
            {selected.media_title || selected.category?.category_name} ?
          </p>
          <Button
            variant="danger"
            className="m-3 mb-3"
            onClick={() => onDelete(selected.media_id)}
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

export default MediaPage;

export async function getServerSideProps(ctx) {
  const db_media = await prisma.media.findMany({
    include: {
      category: true,
    },
  });

  return {
    props: { db_media },
  };
}
