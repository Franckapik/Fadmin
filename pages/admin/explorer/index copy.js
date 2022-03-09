import axios from "axios";
import { traverse } from "fs-tree-utils";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { Row } from "react-bootstrap";
import "react-folder-tree/dist/style.css";
import { AlertValidation } from "../../../components/alertValidation";
import Layout_Admin from "../../../layouts/layout_admin";

import prisma from "../../../prisma/prisma";
//dynamic import instead of require
const DynamicFileTreeImport = dynamic(() => import("react-folder-tree"), {
  ssr: false, // needed to prevent warning about dynamic component
});

const ExplorerPage = ({ files }) => {
  const router = useRouter();
  const { operation, type, value } = router.query;

  function getlastValue(arr, path, i) {
    if (i < path.length - 1) {
      let b = i + 1;
      return getlastValue(arr.children[path[i]], path, b);
    } else {
      return arr.children[path[i]];
    }
  }

  const onTreeStateChange = async (state, event) => {
    console.log(event);
    let s = [];

    switch (event.type) {
      case "renameNode":
        s = getlastValue(state, event.path, 0);

        console.log(getlastValue(state, event.path, 0));
        //doing some rename on api
        const data = {
          old:
            s.container.replace("./public/", "public/") + "/" + s.initialName,
          new: s.container.replace("./public/", "public/") + "/" + s.name,
          type: s.type,
        };
        await axios.post("/api/explorer/rename", data);
        //reload the page to avoid error
        router.reload(window.location.pathname);
        break;
      case "addNode":
        if (event.params[0]) {
          s = getlastValue(state, event.path, 0);
          await axios.post("/api/explorer/create", {
            folderpath: s.initialChemin,
          });
        }
        break;
      /*  case "deleteNode":
        s = getlastValue(state, event.path, 0);
        console.log(state, event);
        await axios.post("/api/explorer/delete", {
          folderpath: s.initialChemin,
        }); */

      default:
    }
  };

  function buildTree(files) {
    //variables
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

    //get all pathes
    var pathes = files.map((a, i) => a.path);

    //pathes loop
    for (let [index, path] of pathes.entries()) {
      let nodes = path.split("/");

      for (let i = 0; i < nodes.length; i++) {
        currentPath = "/" + nodes.slice(1, i + 1).join("/");
        lastPath = stack[stack.length - 1];
        parent = map[lastPath];

        if (!map[currentPath]) {
          node = {
            name: currentPath.split("/").pop(),
            initialChemin: currentPath,
            initialName: files[index].item,
            type: files[index].path.includes(".") ? "file" : "folder",
            children: [],
            container: files[index].container,
          };

          parent.children.push(node);
          map[currentPath] = node;
        }

        stack.push(currentPath);
      }

      stack = stack.slice(0, 1);
    }
    //return the tree object
    return map[""].children[0];
  }

  const tree = buildTree(files);

  return (
    <Layout_Admin title={"Medias"}>
      <AlertValidation
        operation={operation}
        value={value}
        type={type}
      ></AlertValidation>

      <Row className="no-upper">
        <DynamicFileTreeImport
          data={tree}
          onChange={onTreeStateChange}
          showCheckbox={false}
          indentPixels={30}
        />
      </Row>
    </Layout_Admin>
  );
};

export default ExplorerPage;

export async function getServerSideProps(ctx) {
  const db_media = await prisma.media.findMany({
    include: {
      category: true,
    },
  });

  const deep = ({ item }) => item !== "Old";
  const files0 = await traverse("." + process.env.medias_folder, { deep });
  const f1 = JSON.stringify(files0);
  const files = JSON.parse(f1); //serialize issue

  console.log(files);
  return {
    props: { db_media, files: files },
  };
}

//example of tree state
/* const treeState = {
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
}; */

/*   var arr2 = files.map((a) => {
    var b = {};
    b["name"] = a.item;
    b["type"] = a.path.includes(".") ? "file" : "folder";
    b["size"] = a.stats.size;
    b["createdAt"] = a.stats.atime;
    b["parent"] = a.container;
    b["path"] = a.path;
    return b;
  }); */
