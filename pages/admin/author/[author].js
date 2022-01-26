import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
import prisma from "../../../prisma/prisma";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

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
      author_id: db_author.author_id,
      author_name: db_author.author_name,
      author_art: db_author.author_art,
      author_biography_fr: db_author.author_biography_fr,
      author_biography_en: db_author.author_biography_en,
      author_draft: db_author.author_draft,
      author_email: db_author.author_email,
      author_fb: db_author.author_fb,
      author_insta: db_author.author_insta,
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    await axios.post("/api/author/addAuthor", data);
    router.push("/admin/author");
  };

  return (
    <Layout_Admin>
      {db_author ? (
        <h2 className="mb-4 text-center"> Modifier l&apos;artiste</h2>
      ) : (
        <h2 className="mb-4 text-center"> Ajouter un artiste</h2>
      )}
      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <Form.Group className="mb-3" controlId="author_name_id">
          <Form.Label>Nom de l&apos;artiste</Form.Label>
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

        <Form.Group className="mb-3" controlId="author_biography_fr_id">
          <Form.Label>Biographie (FR)</Form.Label>
          <Controller
            control={control}
            name="author_biography_fr"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_biography_fr}
                placeholder="Enter biography in French"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_biography_fr?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_biography_en_id">
          <Form.Label>Biography (EN)</Form.Label>
          <Controller
            control={control}
            name="author_biography_en"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_biography_en}
                placeholder="Enter biography in English"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_biography_en?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_fb_id">
          <Form.Label>Facebook</Form.Label>
          <Controller
            control={control}
            name="author_fb"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_fb}
                placeholder="Enter facebook address"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_biography?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_insta_id">
          <Form.Label>Instagram</Form.Label>
          <Controller
            control={control}
            name="author_insta"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_insta}
                placeholder="Enter instagram address"
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
            defaultValue="true"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Check
                type={"checkbox"}
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
                type="email"
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
  let db_author = 0;

  if (params?.author !== "0") {
    db_author = await prisma.author.findUnique({
      where: {
        author_id: Number(params?.author) || -1,
      },
    });
  }

  return {
    props: { db_author },
  };
}
