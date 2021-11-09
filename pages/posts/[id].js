import { useRouter } from "next/router";
import prisma from "../../prisma/prisma";

const Post = ({ data }) => {
  const router = useRouter();
  console.table(data);

  return <p>Post: {data.title}</p>;
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
