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
import {
  Button,
  Form,
  InputGroup,
  Modal,
  ModalBody,
  Row,
} from "react-bootstrap";
import { AlertValidation } from "../../../components/alertValidation";
import Layout_Admin from "../../../layouts/layout_admin";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import path from "path";

const ExplorerPage = ({ data }) => {
  const router = useRouter();
  const { operation, type, value } = router.query;
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [op, setOp] = useState();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const modifyExplorer = (file, operation) => {
    setOp(operation);
    setSelected(file);
    setShow(true);
  };

  const onSubmit = async (data) => {
    data.old = selected;
    await axios
      .post("/api/explorer/rename", data)
      .then((response) => {
        console.log(response);
        setShow(false);
        router.push(
          "/admin/explorer?operation=renommé&type=élément&value=" +
            response.data.renamed
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FileTree = ({ data, folders }) => {
    console.log(data);
    if (!folders) {
      folders = Object.keys(data); //first
    }
    return Object.values(data).map((a, i) => {
      if (a.path) {
        //file
        return (
          <li>
            {" "}
            <FontAwesomeIcon icon={faFile} /> {a.path.split("/").pop()} -
            {Math.ceil(a.stat.size / 1000) + "ko"}{" "}
            <FontAwesomeIcon icon={faTrash} />
            <FontAwesomeIcon
              icon={faPenSquare}
              onClick={() => modifyExplorer(a.path, "rename")}
            />
          </li>
        );
      } else {
        //folder
        return (
          <div className="mt-3">
            <FontAwesomeIcon icon={faFolderOpen} /> {folders?.[i]} [
            {Object.keys(a).length + " fichiers"}]{" "}
            <FontAwesomeIcon icon={faTrash} />
            <FontAwesomeIcon
              icon={faPenSquare}
              onClick={() => modifyExplorer(path.dirname(a[0].path), "rename")}
            />
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
      <Modal show={show} onHide={() => setShow(false)}>
        <ModalBody>
          {op === "rename" ? (
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Form.Group className="mb-3" controlId="renamed">
                <Form.Label>
                  Renommer l élément {selected.replace(/^.*[\\\/]/, "")}
                </Form.Label>
                <InputGroup>
                  <Controller
                    control={control}
                    rules={{
                      required: "Ce champ est manquant",
                      pattern: {
                        value: /[^\\]*\.(\w+)$/,
                        message: "extension du fichier manquante",
                      },
                      maxLength: {
                        value: 100,
                        message: "Ce champ contient trop de caractères",
                      },
                    }}
                    name="renamed"
                    defaultValue=""
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        isInvalid={errors.renamed}
                      />
                    )}
                  />
                  <Button type="submit">Renommer</Button>
                </InputGroup>

                <Form.Control.Feedback type="invalid">
                  {errors.author_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          ) : null}
        </ModalBody>
      </Modal>
    </Layout_Admin>
  );
};

export default ExplorerPage;

export async function getServerSideProps() {
  const { data } = await axios.get(process.env.DOMAIN + `/api/explorer/list`);

  return {
    props: { data },
  };
}
