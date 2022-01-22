import { useState } from "react";
import { Button, Modal, Row, Table } from "react-bootstrap";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";
import { traverse } from "fs-tree-utils";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const MediaPage = ({ db_media, files }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const router = useRouter();

  const onDelete = async (data) => {
    await axios.post("/api/media/deleteMedia", { id: data });
    setShow(!show);
    router.push("/admin/media");
  };
  var tableauFormaté = files.map((a) => {
    var b = {};
    b["name"] = a.item;
    b["type"] = a.path.includes(".") ? "file" : "folder";
    b["size"] = a.stats.size;
    b["createdAt"] = a.stats.atime;
    return b;
  });
  console.log(tableauFormaté);
  var containers = files.map((a, i) => a.container);
  const uniq = [...new Set(containers)];

  return (
    <Layout_Admin title={"Medias"}>
      <Row>
        <Table striped borderless hover className="mt-5">
          <thead>
            <tr>
              <th>Artistes</th>
            </tr>
          </thead>
          <tbody>
            {uniq &&
              uniq.map((a, i) => {
                return (
                  <tr key={"jenesaispas"}>
                    <td key={"a" + i}>{a}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
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
  const deep = ({ item }) => item !== "Old";
  const files0 = await traverse("." + process.env.medias_folder, { deep });
  const f1 = JSON.stringify(files0);
  const files = JSON.parse(f1); //serialize issue

  return {
    props: { user: session.user, db_media, files: files },
  };
}
