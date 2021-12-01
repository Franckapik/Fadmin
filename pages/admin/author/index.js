import { ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Page({ db_author }) {
  return (
    <Layout_Admin>
      <ListGroup>
        {db_author && db_author.length
          ? db_author.map((a, i) => {
              return (
                <ListGroupItem key={i + 1}>
                  <Nav.Link eventKey={i} href={`/admin/author/${a.author_id}`}>
                    {a.author_name}
                    <p className="thin">{a.author_art}</p>
                  </Nav.Link>
                </ListGroupItem>
              );
            })
          : null}
      </ListGroup>
    </Layout_Admin>
  );
}

export async function getServerSideProps() {
  const db_author = await prisma.author.findMany();

  return {
    props: { db_author },
  };
}
