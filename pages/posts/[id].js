import { useRouter } from "next/router";
import prisma from "../../prisma/prisma";

const Post = ({ data }) => {
  const router = useRouter();
  console.table(data);

  return (
    <p>
      Post: {data.title}{" "}
      <button type="button" class="btn btn-primary">
        Essai
      </button>
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </p>
  );
};

export default Post;

/* export async function getStaticProps() {
  const res = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.log(res);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
 */

/* export async function getStaticProps() {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  console.log(allUsers);
  const data = JSON.parse(JSON.stringify(allUsers)); //issue with Date from PSQL with NextJS

  return {
    props: { data },
  };
} */

export async function getServerSideProps({ params }) {
  const allUsers = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
  });

  console.log(allUsers);
  const data = JSON.parse(JSON.stringify(allUsers)); //issue with Date from PSQL with NextJS

  return {
    props: { data },
  };
}
