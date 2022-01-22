import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import { Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import Moment from "react-moment";
import Sidebar from "../components/sidebaradmin";

export default function Layout_Admin({ children, title }) {
  const [session, loading] = useSession();
  return (
    <Container fluid style={{ paddingLeft: "0" }} className="admin">
      {session ? (
        <>
          <Row>
            <Col xs={2}>
              <Sidebar></Sidebar>
            </Col>
            <Col xs={10}>
              <header>
                <Nav className="justify-content-between align-items-center mt-2">
                  {title}
                  <Nav.Item>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
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
          <div className="text-center small mb-5">
            Expiration de la session :{" "}
            <Moment format="DD/MM/YYYY">{session.expires}</Moment>
          </div>
        </>
      ) : null}
    </Container>
  );
}
