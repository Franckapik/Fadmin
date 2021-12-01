import { ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default function Page({ db_media }) {
  return (
    <Layout_Admin>
      <ListGroup>
        {db_media && db_media.length
          ? db_media.map((a, i) => {
              return (
                <ListGroupItem key={i + 1}>
                  <Nav.Link eventKey={i} href={`/admin/media/${a.media_id}`}>
                    {a.media_title}
                    <p className="thin">{a.media_subtitle}</p>
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
  const db_media = await prisma.media.findMany();

  return {
    props: { db_media },
  };
}
