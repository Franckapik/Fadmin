import { Row } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
import { Grid } from "../../../components/grid";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CategoryPage = ({ db_category }) => (
  <Layout_Admin>
    <Row xs={1} md={4} className="g-4">
      {db_category && db_category.length
        ? db_category.map((a, i) => {
            return (
              <Grid
                title={a.category_name}
                text={a.author.author_name}
                edit_link={`/admin/category/${a.category_id}`}
              ></Grid>
            );
          })
        : null}
    </Row>
  </Layout_Admin>
);

export default CategoryPage;

export async function getServerSideProps() {
  const db_category = await prisma.category.findMany({
    include: {
      author: true,
    },
  });

  return {
    props: { db_category },
  };
}
