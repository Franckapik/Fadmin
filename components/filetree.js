import { Card, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

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

const FileTree = ({ data, modifyOp }) => {
  const [showM, setshowM] = useState(false);
  const [opened, setOpen] = useState(false);

  const popover = (element) => (
    <Popover id="popover-basic">
      <Popover.Body>
        {" "}
        <i
          className="fal fa-pen m-2 cursor "
          onClick={() => modifyOp(element, "rename")}
        />
        <i
          className="fal fa-trash m-2 cursor "
          style={{ color: "red" }}
          onClick={() => modifyOp(element, "delete")}
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
                a.isDirectory ? (
                  <>
                    <i
                      className="fal fa-folder-plus"
                      onClick={() => modifyOp(a, "create")}
                    />

                    <i
                      className="fal fa-pen"
                      onClick={() => modifyOp(a, "rename")}
                    />

                    <i
                      className="fal fa-file-plus"
                      onClick={() => modifyOp(a, "upload")}
                    />
                    <i
                      className="fal fa-trash"
                      style={{ color: "red" }}
                      onClick={() => modifyOp(a, "delete")}
                    />
                  </>
                ) : (
                  <>
                    <i
                      className="fal fa-trash m-2"
                      onClick={() => modifyOp(a, "delete")}
                    />
                    <i
                      className="fal fa-pen m-2"
                      onClick={() => modifyOp(a, "rename")}
                    />
                  </>
                )
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

export default FileTree;