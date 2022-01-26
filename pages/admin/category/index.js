import { Button, Modal, Row } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
import { CardAdmin } from "../../../components/cardadmin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { getSession } from "next-auth/react";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CategoryPage = ({ db_category }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const router = useRouter();

  const onDelete = async (data) => {
    await axios.post("/api/category/deleteCategory", { id: data });
    setShow(!show);
    router.push("/admin/category");
  };

  return (
    <Layout_Admin title={"Categories"}>
      <Row xs={1} md={4} className="g-4" key={"addForm"}>
        <CardAdmin
          title={"Ajouter une catégorie"}
          text={"____"}
          edit_link={"/admin/category/0"}
          setShow={setShow}
          show={show}
          add
        ></CardAdmin>
        {db_category && db_category.length
          ? db_category.map((a, i) => {
              return (
                <CardAdmin
                  key={i}
                  all={a}
                  setSelected={setSelected}
                  title={a.category_name}
                  text={a.author.author_name}
                  edit_link={`/admin/category/${a.category_id}`}
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
            Etes vous certain de vouloir supprimer la categorie{" "}
            {selected.category_name} ?
          </p>
          <Button
            variant="danger"
            className="m-3 mb-3"
            onClick={() => onDelete(selected.category_id)}
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

export default CategoryPage;

export async function getServerSideProps(ctx) {
  const db_category = await prisma.category.findMany({
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

  return {
    props: { user: session.user, db_category },
  };
}
