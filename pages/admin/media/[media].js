import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { useForm, Controller } from "react-hook-form";

const MediaAdmin = ({ db_media }) => {
  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      media_title: db_media.media_title,
      media_photo: db_media.media_photo,
      media_video: db_media.media_video,
      media_content: db_media.media_content,
      media_link: db_media.media_link,
      media_share: db_media.media_share,
      media_category_id: db_media.media_category_id,
      media_folder: db_media.media_folder,
      media_subtitle: db_media.media_subtitle,
      media_author_id: db_media.media_author_id,
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
    return null;
  };

  return (
    <Layout_Admin>
      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <Form.Group className="mb-3" controlId="media_title_id">
          <Form.Label>Titre du media</Form.Label>
          <Controller
            control={control}
            name="media_title"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_title}
                placeholder="Enter media title"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_photo_id">
          <Form.Label>Photography</Form.Label>
          <Controller
            control={control}
            name="media_photo"
            defaultValue="photo"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_photo}
                placeholder="Enter photography"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_photo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_video_id">
          <Form.Label>Video</Form.Label>
          <Controller
            control={control}
            name="media_video"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_video}
                placeholder="Enter video"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_video?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_content_id">
          <Form.Label>Contenu</Form.Label>
          <Controller
            control={control}
            name="media_content"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_content}
                placeholder="Enter content of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_content?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_link_id">
          <Form.Label>Lien</Form.Label>
          <Controller
            control={control}
            name="media_link"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_link}
                placeholder="Enter link of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_link?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_share_id">
          <Form.Label>Partage</Form.Label>
          <Controller
            control={control}
            name="media_share"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_share}
                placeholder="Enter share of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_share?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_category_id_id">
          <Form.Label>Categorie</Form.Label>
          <Controller
            control={control}
            name="media_category_id"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_category_id}
                placeholder="Enter category of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_category_id?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_folder_id">
          <Form.Label>Nom du dossier</Form.Label>
          <Controller
            control={control}
            name="media_folder"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_folder}
                placeholder="Enter folder name of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_folder?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_subtitle_id">
          <Form.Label>Categorie</Form.Label>
          <Controller
            control={control}
            name="media_subtitle"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_subtitle}
                placeholder="Enter share of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_subtitle?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="media_author_id_id">
          <Form.Label>Auteur</Form.Label>
          <Controller
            control={control}
            name="media_author_id"
            defaultValue="video"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.media_author_id}
                placeholder="Enter author of the media"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.media_author_id?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Valider
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
