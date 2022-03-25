import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert, Row } from "react-bootstrap";

export const AlertValidation = ({ operation, type, value, count }) => {
  const [alert, setAlert] = useState(true);

  return (
    <Row>
      {operation && alert ? (
        <Alert variant={"success"} onClose={() => setAlert(false)} dismissible>
          <FontAwesomeIcon icon={faCheck} width="2em" /> {count} {type} {value}{" "}
          {operation} !
        </Alert>
      ) : null}
    </Row>
  );
};
