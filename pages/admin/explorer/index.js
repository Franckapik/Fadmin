import { useState } from "react";
import { Button, Modal, Row, Table } from "react-bootstrap";
import { CardAdmin } from "../../../components/cardadmin";
import Layout_Admin from "../../../layouts/layout_admin";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";
import { traverse } from "fs-tree-utils";
import "react-folder-tree/dist/style.css";
import dynamic from "next/dynamic";

const DynamicFileTreeImport = dynamic(() => import("react-folder-tree"), {
  ssr: false, // needed to prevent warning about dynamic component
});

const treeState = {
  name: "root [half checked and opened]",
  checked: 0.5, // half check: some children are checked
  isOpen: true, // this folder is opened, we can see it's children
  children: [
    { name: "children 1 [not checked]", checked: 0 },
    {
      name: "children 2 [half checked and not opened]",
      checked: 0.5,
      isOpen: false,
      children: [
        { name: "children 2-1 [not checked]", checked: 0 },
        { name: "children 2-2 [checked]", checked: 1 },
      ],
    },
  ],
};

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
  var arr2 = files.map((a) => {
    var b = {};
    b["name"] = a.item;
    b["type"] = a.path.includes(".") ? "file" : "folder";
    b["size"] = a.stats.size;
    b["createdAt"] = a.stats.atime;
    b["parent"] = a.container;
    b["path"] = a.path;
    return b;
  });

  const onTreeStateChange = (state, event) => console.log(state, event);

  var arr3 = arr2.map((a, i) => a.path);

  function buildTree(pathes, getValueCB) {
    var currentPath,
      lastPath,
      node,
      parent,
      map = {
        "": {
          children: [],
        },
      },
      stack = [""];

    for (let path of pathes) {
      let nodes = path.split("/");
      for (let i = 0; i < nodes.length; i++) {
        currentPath = "/" + nodes.slice(1, i + 1).join("/");
        lastPath = stack[stack.length - 1];
        parent = map[lastPath];
        if (!map[currentPath]) {
          node = {
            name: currentPath,
            value: getValueCB(currentPath),
            children: [],
          };
          parent.children.push(node);
          map[currentPath] = node;
        }
        stack.push(currentPath);
      }
      stack = stack.slice(0, 1);
    }
    return map[""].children[0];
  }

  function getFileSizeSync() {
    return 200;
  }
  var tree = buildTree(arr3, function (path) {
    return getFileSizeSync(path);
  });

  console.log(tree);

  return (
    <Layout_Admin title={"Medias"}>
      <Row>
        <DynamicFileTreeImport
          data={tree}
          onChange={onTreeStateChange}
          showCheckbox={false}
          indentPixels={100}
        />
        {
          <Table striped borderless hover className="mt-5">
            <thead>
              <tr>
                <th>Artistes</th>
              </tr>
            </thead>
            <tbody>
              {tree &&
                Object.keys(tree).map((a, i) => {
                  return (
                    <tr key={"jenesaispas"}>
                      <td key={"a" + i}>{a}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        }
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
