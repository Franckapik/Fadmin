import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
import prisma from "../../../prisma/prisma";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const CategoryAdmin = ({ db_category, db_author }) => {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      category_id: db_category.category_id,
      category_name: db_category.category_name,
      category_description: db_category.category_description,
      category_draft: db_category.category_draft,
      category_author: db_category.category_author,
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    data.category_author = parseInt(data.category_author); //integer issue

    await axios
      .post("/api/category/addCategory", data)
      .then((response) => {
        console.log(response);
        router.push(
          "/admin/category?operation=ajoutée&type=categorie&value=" +
            response.data.category_name
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout_Admin>
      {db_category ? (
        <h2 className="mb-4 text-center"> Modifier la catégorie</h2>
      ) : (
        <h2 className="mb-4 text-center"> Ajouter une catégorie</h2>
      )}
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
            defaultValue={true}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Check
                type={"checkbox"}
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.author_draft}
                placeholder="draft of the category"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_draft?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_author_id_id">
          <Form.Label>Auteur</Form.Label>
          <Controller
            control={control}
            name="category_author"
            defaultValue={1}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Select
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.category_author}
                aria-label="Default select example"
              >
                {db_author.map((a, i) => (
                  <option key={"author" + i} value={parseInt(a.author_id)}>
                    {a.author_name}
                  </option>
                ))}
              </Form.Select>
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
  let db_category = 0;

  if (params?.category !== "0") {
    db_category = await prisma.category.findUnique({
      where: {
        category_id: Number(params?.category) || -1,
      },
    });
  }

  const db_author = await prisma.author.findMany();

  return {
    props: { db_category, db_author },
  };
}
