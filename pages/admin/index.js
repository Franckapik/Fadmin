import { getProviders, signIn, signOut, useSession } from "next-auth/client";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebaradmin";
import Layout_Admin from "../../layouts/layout_admin";

export default function Page({ providers }) {
  const [session, loading] = useSession();
  return (
    <>
      {!session && (
        <>
          <Container>
            <Row className="text-center mt-5">
              {" "}
              <Col className="signin">
                <h2>Qualyn Admnistration</h2>
                {Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                    <Button
                      onClick={() => signIn(provider.id)}
                      className="mt-5 p-3"
                    >
                      Sign in with {provider.name}
                    </Button>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </>
      )}
      {session && (
        <>
          <Layout_Admin>
            <Row>
              <Col xs={10} id="page-content-wrapper">
                <main>Qualyn Dashboard</main>
              </Col>
            </Row>
          </Layout_Admin>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
