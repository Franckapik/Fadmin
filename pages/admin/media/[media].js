import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MediaAdmin = ({ db_media }) => {
  return (
    <Layout_Admin>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout_Admin>
  );
};

export default MediaAdmin;

export async function getServerSideProps({ params }) {
  const db_media = await prisma.media.findUnique({
    where: {
      media_id: Number(params?.media) || -1,
    },
  });

  return {
    props: { db_media },
  };
}
