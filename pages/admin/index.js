import { signIn, signOut, useSession } from "next-auth/client";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";

export default function Page() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <>
            <Container fluid>
              <Row>
                {Sidebar}
                <Col xs={10} id="page-content-wrapper">
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
                  <main>ici le main</main>
                </Col>
              </Row>
            </Container>
          </>
        </>
      )}
    </>
  );
}
