import { ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Page({ db_category }) {
  return (
    <Layout_Admin>
      <ListGroup>
        {db_category && db_category.length
          ? db_category.map((a, i) => {
              return (
                <ListGroupItem key={i + 1}>
                  <Nav.Link
                    eventKey={i}
                    href={`/admin/category/${a.category_id}`}
                  >
                    {a.category_name}
                    <p className="thin">{a.category_description}</p>
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
  const db_category = await prisma.category.findMany();

  return {
    props: { db_category },
  };
}
