import { Row } from "react-bootstrap";
import { Grid } from "../../../components/grid";
import Layout_Admin from "../../../layouts/layout_admin";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const AuthorPage = ({ db_author }) => (
  <Layout_Admin>
    <Row xs={1} md={4} className="g-4">
      {db_author && db_author.length
        ? db_author.map((a, i) => {
            return (
              <Grid
                title={a.author_name}
                text={a.author_art}
                edit_link={`/admin/author/${a.author_id}`}
              ></Grid>
            );
          })
        : null}
    </Row>
  </Layout_Admin>
);

export default AuthorPage;

export async function getServerSideProps() {
  const db_author = await prisma.author.findMany();

  return {
    props: { db_author },
  };
}
