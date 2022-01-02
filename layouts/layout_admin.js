import { signIn, signOut, useSession } from "next-auth/client";
import { Button, Col, Container, Nav, Row, Dropdown } from "react-bootstrap";
import Sidebar from "../components/sidebaradmin";

export default function Layout_Admin({ children }) {
  const [session, loading] = useSession();
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col xs={10}>
          <header>
            <Nav className="justify-content-end">
              <Nav.Item className="m-5">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      width={"40em"}
                    />
                    <span className="m-3">{session.user.name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/admin">Home</Dropdown.Item>
                    <Dropdown.Item onClick={() => signOut()}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            </Nav>
          </header>
          <main className="p-5">{children}</main>
        </Col>
      </Row>
    </Container>
  );
}
