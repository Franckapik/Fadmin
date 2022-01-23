import { traverse } from "fs-tree-utils";
import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { Row } from "react-bootstrap";
import "react-folder-tree/dist/style.css";
import Layout_Admin from "../../../layouts/layout_admin";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//dynamic import instead of require
const DynamicFileTreeImport = dynamic(() => import("react-folder-tree"), {
  ssr: false, // needed to prevent warning about dynamic component
});

const ExplorerPage = ({ db_media, files }) => {
  const router = useRouter();

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

  function getlastValue(arr, path, i) {
    if (i < path.length - 1) {
      let b = i + 1;
      return getlastValue(arr.children[path[i]], path, b);
    } else {
      return arr.children[path[i]];
    }
  }

  const onTreeStateChange = (state, event) => {
    switch (event.type) {
      case "renameNode":
        console.log(getlastValue(state, event.path, 0));
        //doing some rename on api
        break;

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
            chemin: currentPath,
            value: files[index].item,
            type: files[index].path.includes(".") ? "file" : "folder",
            children: [],
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

  var tree = buildTree(files);

  return (
    <Layout_Admin title={"Medias"}>
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
