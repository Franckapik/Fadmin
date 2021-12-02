import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { useForm, Controller } from "react-hook-form";

const CategoryAdmin = ({ db_category }) => {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      category_name: db_category.category_name,
      category_page_id: db_category.category_page_id,
      category_description: db_category.category_description,
      category_draft: db_category.category_draft,
      category_author: db_category.category_author,
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
    return null;
  };

  return (
    <Layout_Admin>
      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <Form.Group className="mb-3" controlId="category_name_id">
          <Form.Label>Nom de categorie</Form.Label>
          <Controller
            control={control}
            name="category_name"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.category_name}
                placeholder="Enter category name"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="category_page_id_id">
          <Form.Label>Type de categorie</Form.Label>
          <Controller
            control={control}
            name="category_page_id"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.category_page_id}
                placeholder="Enter category type"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_page_id?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="category_description_id">
          <Form.Label>Description</Form.Label>
          <Controller
            control={control}
            name="category_description"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.category_description}
                placeholder="Enter category description"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="category_draft_id">
          <Form.Label>Brouillon</Form.Label>
          <Controller
            control={control}
            name="category_draft"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.category_draft}
                placeholder="draft of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_draft?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="category_author_id">
          <Form.Label>Auteur</Form.Label>
          <Controller
            control={control}
            name="category_author"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.category_author}
                placeholder="Auteur"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_author?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Valider
        </Button>
      </Form>
    </Layout_Admin>
  );
};

export default CategoryAdmin;

export async function getServerSideProps({ params }) {
  const db_category = await prisma.category.findUnique({
    where: {
      category_id: Number(params?.category) || -1,
    },
  });

  return {
    props: { db_category },
  };
}
