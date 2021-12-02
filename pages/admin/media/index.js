import { Row } from "react-bootstrap";
import { Grid } from "../../../components/grid";
import Layout_Admin from "../../../layouts/layout_admin";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const MediaPage = ({ db_media }) => (
  <Layout_Admin>
    <Row xs={1} md={4} className="g-4">
      {db_media && db_media.length
        ? db_media.map((a, i) => {
            return (
              <Grid
                title={a.media_title}
                text={a.media_subtitle}
                edit_link={`/admin/media/${a.media_id}`}
              ></Grid>
            );
          })
        : null}
    </Row>
  </Layout_Admin>
);

export default MediaPage;

export async function getServerSideProps() {
  const db_media = await prisma.media.findMany();

  return {
    props: { db_media },
  };
}
