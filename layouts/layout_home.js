import Head from "next/head";
import Link from "next/link";
import { Container, Nav, Row } from "react-bootstrap";
import { Categories } from "../components/categories";

export default function Layout_Home({
  children,
  author,
  authors,
  categories,
  blog,
  overview,
  contact,
  comment,
}) {
  return (
    <Container fluid className="container_main">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <header className="text-center">
          <Row className="m-4">
            <Link href="/">
              <h1 className="cursor">
                <span style={{ fontSize: "1.3em" }}>Q</span>ualyn
              </h1>
            </Link>
          </Row>
          <Row className="justify-content-md-center pb-2">
            <Nav className="justify-content-center">
              {authors && authors.length
                ? authors.map((a, i) => {
                    return (
                      <Nav.Item key={i + 1}>
                        <Nav.Link
                          eventKey={i}
                          onClick={() => addQuery("categ", a.category_id)}
                          href={`/authors/${a.author_id}`}
                          className="nav-authors"
                        >
                          <h2>
                            {" "}
                            <p>{a.author_name}</p>{" "}
                          </h2>
                          <p className="thin"> {a.author_art}</p>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })
                : null}
            </Nav>
          </Row>
        </header>
        <main>
          <Categories
            categories={categories}
            author={author}
            overview={overview}
            blog={blog}
            contact={contact}
            comment={comment}
          ></Categories>

          {children}
        </main>
      </section>
      <footer></footer>
    </Container>
  );
}
