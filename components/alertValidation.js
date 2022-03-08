import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert, Row } from "react-bootstrap";

export const AlertValidation = ({ operation, type, value }) => {
  const [alert, setAlert] = useState(true);

  return (
    <Row>
      {operation && alert ? (
        <Alert variant={"success"} onClose={() => setAlert(false)} dismissible>
          <FontAwesomeIcon icon={faCheck} width="2em" /> Le media {value} a bien
          été {operation} !
        </Alert>
      ) : null}
    </Row>
  );
};
