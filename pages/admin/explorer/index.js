import {
  faEllipsisV,
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
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  ModalBody,
  OverlayTrigger,
  Popover,
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
  const [filesSelected, setfilesSelected] = useState(false);

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

  const onChangeFiles = (event) => {
    //when selecting files on local
    const e = event.target.files;
    if (e && e[0]) {
      setfilesSelected(event.target.files);
    } else {
      console.log("No file selected");
      setfilesSelected(false);
    }
  };

  const onSubmit = async (data) => {
    data.file = selected;
    switch (op) {
      case "rename":
        await axios
          .post("/api/explorer/rename", data)
          .then((response) => {
            setShow(false);
            router.push(
              "/admin/explorer?operation=renommé&type=élément&value=" +
                response.data.renamed
            );
          })
          .catch((error) => {
            console.log(error);
          });
        break;

      case "delete":
        await axios
          .post("/api/explorer/delete", data)
          .then((response) => {
            setShow(false);
            router.push(
              "/admin/explorer?operation=supprimé&type=élément&value=" +
                response.data.deleted
            );
          })
          .catch((error) => {
            console.log(error);
          });
        break;

      case "create":
        await axios
          .post("/api/explorer/create", data)
          .then((response) => {
            setShow(false);
            router.push(
              "/admin/explorer?operation=créé&type=élément&value=" +
                response.data.created
            );
          })
          .catch((error) => {
            console.log(error);
          });
        break;

      case "upload":
        const body = new FormData();
        body.append("path", selected.fullname);
        Object.keys(filesSelected).map((i) => {
          body.append("file", filesSelected[i]);
        });

        await axios
          .post("/api/explorer/upload", body)
          .then((response) => {
            setShow(false);
            router.push(
              "/admin/explorer?operation=téléversé&type=élément&value=" +
                response.data.uploaded
            );
          })
          .catch((error) => {
            console.log(error);
          });
        break;

      default:
        break;
    }
  };

  const ModifyDisplay = ({ element, dir }) => {
    return (
      <>
        {dir ? (
          <>
            <i
              className="fal fa-folder-plus"
              onClick={() => modifyExplorer(element, "create")}
            />

            <i
              className="fal fa-pen"
              onClick={() => modifyExplorer(element, "rename")}
            />

            <i
              className="fal fa-file-plus"
              onClick={() => modifyExplorer(element, "upload")}
            />
            <i
              className="fal fa-trash"
              style={{ color: "red" }}
              onClick={() => modifyExplorer(element, "delete")}
            />
          </>
        ) : (
          <>
            <i
              className="fal fa-trash m-2"
              onClick={() => modifyExplorer(element, "delete")}
            />
            <i
              className="fal fa-pen m-2"
              onClick={() => modifyExplorer(element, "rename")}
            />
          </>
        )}
      </>
    );
  };

  const FileTree = ({ data }) => {
    const [showM, setshowM] = useState(false);
    const [opened, setOpen] = useState(false);

    const popover = (element) => (
      <Popover id="popover-basic">
        <Popover.Body>
          {" "}
          <i
            className="fal fa-pen m-2 cursor "
            onClick={() => modifyExplorer(element, "rename")}
          />
          <i
            className="fal fa-trash m-2 cursor "
            style={{ color: "red" }}
            onClick={() => modifyExplorer(element, "delete")}
          />
        </Popover.Body>
      </Popover>
    );

    return Object.values(data).map((a, i) => {
      if (a.isDirectory) {
        //folder
        return (
          <Col className="folder">
            <Card className="card_folder">
              <Card.Header>
                {a.name}
                {showM === a.fullname ? (
                  <ModifyDisplay
                    element={a}
                    dir={a.isDirectory}
                  ></ModifyDisplay>
                ) : null}
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  onClick={() => setshowM(showM ? false : a.fullname)}
                />
              </Card.Header>
              <Card.Body onClick={() => setOpen(a.fullname)}>
                {" "}
                {a.fullname === opened ? null : (
                  <i className="fad fa-folder folder_icon"></i>
                )}
                {opened === a.fullname && a.content ? (
                  <Row>
                    <FileTree data={a.content}></FileTree>
                  </Row>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        );
      } else {
        //file
        return (
          <OverlayTrigger
            show={a.fullname === showM}
            trigger="click"
            placement="right"
            overlay={popover(a)}
          >
            <Card.Text onClick={() => setshowM(a.fullname)}>
              <i className="fal fa-file-image m-2" /> {a.name}
            </Card.Text>
          </OverlayTrigger>
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

      <Col className="no-upper tree">
        <FileTree data={data}></FileTree>
      </Col>
      <Modal show={show} onHide={() => setShow(false)}>
        <ModalBody>
          {op === "rename" ? (
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Form.Group className="mb-3" controlId="renamed">
                <Form.Label>Renommer l élément {selected.name}</Form.Label>
                <InputGroup>
                  <Controller
                    control={control}
                    rules={
                      !selected.isDirectory
                        ? {
                            required: "Ce champ est manquant",
                            pattern: {
                              value: /[^\\]*\.(\w+)$/,
                              message: "extension du fichier manquante",
                            },
                            maxLength: {
                              value: 100,
                              message: "Ce champ contient trop de caractères",
                            },
                          }
                        : {
                            maxLength: {
                              value: 100,
                              message: "Ce champ contient trop de caractères",
                            },
                          }
                    }
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

          {op === "upload" ? (
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Form.Group className="mb-3" controlId="uploaded">
                <Form.Label>Ajouter une image : </Form.Label>

                <Controller
                  control={control}
                  name="uploaded"
                  defaultValue="photo"
                  render={({ field: { ref } }) => (
                    <Form.Control
                      type="file"
                      multiple
                      onChange={onChangeFiles}
                      ref={ref}
                      isInvalid={errors.uploaded}
                      placeholder="Enter photography"
                    />
                  )}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.uploaded?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Téléverser</Button>
            </Form>
          ) : null}
          {op === "create" ? (
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Form.Group className="mb-3" controlId="created">
                <Form.Label>
                  Creer un nouveau dossier dans {selected.name} :
                </Form.Label>
                <InputGroup>
                  <Controller
                    control={control}
                    rules={{
                      maxLength: {
                        value: 30,
                        message: "Ce champ contient trop de caractères",
                      },
                    }}
                    name="created"
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
                  <Button type="submit">Créer</Button>
                </InputGroup>

                <Form.Control.Feedback type="invalid">
                  {errors.author_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          ) : null}

          {op === "delete" ? (
            <>
              <Form>
                <Form.Label> Supprimer {selected.name} ?</Form.Label>
                <Form.Group className="mb-3" controlId="deleted">
                  <Button
                    type="submit"
                    onClick={() => onSubmit({ data: "essai" })}
                  >
                    Supprimer
                  </Button>{" "}
                  <Button
                    type="submit"
                    variant="danger"
                    onClick={() => setShow(!show)}
                  >
                    Annuler
                  </Button>
                </Form.Group>
              </Form>
            </>
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
