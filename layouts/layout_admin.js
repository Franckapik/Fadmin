import { signIn, signOut, useSession } from "next-auth/client";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
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
          {/*  <header>
            <Nav className="justify-content-center">
              <Nav.Item className="m-5">Bienvenue {session.user.name}</Nav.Item>
              <Nav.Item className="m-5">
                <Button onClick={() => signOut()}>Sign out</Button>
              </Nav.Item>
            </Nav>
          </header> */}
          <main className="p-5">{children}</main>
        </Col>
      </Row>
    </Container>
  );
  /* 
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <Container fluid>
          <Row>
            <Sidebar></Sidebar>
            <Col xs={10}>
              <header>
                <Nav className="justify-content-center">
                  <Nav.Item className="m-5">
                    Bienvenue {session.user.name}
                  </Nav.Item>
                  <Nav.Item className="m-5">
                    <Button onClick={() => signOut()}>Sign out</Button>
                  </Nav.Item>
                </Nav>
              </header>
              <main>{children}</main>
            </Col>
          </Row>
        </Container>
      )}
    </>
  ); */
}
