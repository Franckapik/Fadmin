import {
  faFile,
  faFolderOpen,
  faPenSquare,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { Row } from "react-bootstrap";
import { AlertValidation } from "../../../components/alertValidation";
import Layout_Admin from "../../../layouts/layout_admin";

const ExplorerPage = ({ data }) => {
  const router = useRouter();
  const { operation, type, value } = router.query;

  const FileTree = ({ data, folders }) => {
    if (!folders) {
      folders = Object.keys(data);
    }
    return Object.values(data).map((a, i) => {
      if (a.path) {
        //file
        return (
          <li>
            {" "}
            <FontAwesomeIcon icon={faFile} /> {a.path.split("/").pop()} -
            {Math.ceil(a.stat.size / 1000) + "ko"}{" "}
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => console.log(a.path)}
            />
            <FontAwesomeIcon icon={faPenSquare} />
          </li>
        );
      } else {
        //folder
        return (
          <div className="mt-3">
            <FontAwesomeIcon icon={faFolderOpen} /> {folders?.[i]} [
            {Object.keys(a).length + " fichiers"}]{" "}
            <FontAwesomeIcon icon={faTrash} />
            <FontAwesomeIcon icon={faPenSquare} />
            <FontAwesomeIcon icon={faPlusCircle} />
            <ul>
              <FileTree data={a} folders={Object.keys(a)}></FileTree>
            </ul>
          </div>
        );
      }
    });
  };

  return (
    <Layout_Admin title={"Medias"}>
      <AlertValidation
        operation={operation}
        value={value}
        type={type}
      ></AlertValidation>

      <Row className="no-upper tree">
        <FileTree data={data}></FileTree>
      </Row>
    </Layout_Admin>
  );
};

export default ExplorerPage;

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`http://localhost:3000/api/explorer/list`);

  return {
    props: { data },
  };
}
