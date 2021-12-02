import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { useForm, Controller } from "react-hook-form";

const AuthorAdmin = ({ db_author }) => {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      author_name: db_author.author_name,
      author_art: db_author.author_art,
      author_biography: db_author.author_biography,
      author_draft: db_author.author_draft,
      author_email: db_author.author_email,
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
    return null;
  };

  return (
    <Layout_Admin>
      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <Form.Group className="mb-3" controlId="author_name_id">
          <Form.Label>Nom de l'artiste</Form.Label>
          <Controller
            control={control}
            name="author_name"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_name}
                placeholder="Enter author name"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_art_id">
          <Form.Label>Domaine artistique</Form.Label>
          <Controller
            control={control}
            name="author_art"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_art}
                placeholder="Enter art"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_art?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_biography_id">
          <Form.Label>Biographie</Form.Label>
          <Controller
            control={control}
            name="author_biography"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_biography}
                placeholder="Enter biography"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_biography?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_draft_id">
          <Form.Label>Brouillon</Form.Label>
          <Controller
            control={control}
            name="author_draft"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_draft}
                placeholder="draft of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_draft?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_email_id">
          <Form.Label>E-mail</Form.Label>
          <Controller
            control={control}
            name="author_email"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_email}
                placeholder="Auteur"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Valider
        </Button>
      </Form>
    </Layout_Admin>
  );
};

export default AuthorAdmin;

export async function getServerSideProps({ params }) {
  const db_author = await prisma.author.findUnique({
    where: {
      author_id: Number(params?.author) || -1,
    },
  });

  return {
    props: { db_author },
  };
}