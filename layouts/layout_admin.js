import { UserButton, useUser } from "@clerk/nextjs";
import { Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import Sidebar from "../components/sidebaradmin";

export default function Layout_Admin({ children, title }) {
  const { firstName, publicMetadata } = useUser();
  return (
    <Container fluid style={{ paddingLeft: "0" }} className="admin">
      <>
        <Row>
          <Col xs={1}>
            <Sidebar></Sidebar>
          </Col>
          <Col xs={11}>
            <header>
              <Nav className="justify-content-center align-items-center mt-2">
                <Nav.Item className="m-3">
                  <UserButton />
                </Nav.Item>
                <Nav.Item className="m-3">{firstName}</Nav.Item>
              </Nav>
            </header>
            {publicMetadata.isAdmin ? (
              <main style={{ marginLeft: "4em", paddingRight: "2em" }}>
                {children}
              </main>
            ) : (
              "No authorized"
            )}
          </Col>
        </Row>
      </>
    </Container>
  );
}
