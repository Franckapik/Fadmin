import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import { Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import Sidebar from "../components/sidebaradmin";

export default function Layout_Admin({ children, title }) {
  const [session, loading] = useSession();
  return (
    <Container fluid style={{ paddingLeft: "0" }} className="admin">
      {session ? (
        <Row>
          <Col xs={2}>
            <Sidebar></Sidebar>
          </Col>
          <Col xs={10}>
            <header>
              <Nav className="justify-content-between align-items-center mt-2">
                <h5 className="title">{title}</h5>
                <Nav.Item>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <Image
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
      ) : null}
    </Container>
  );
}
