const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  //create data => db

  await prisma.author.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      categories: [1, 2],
      art: "Sound",
      biography: "voici ma biographie",
      draft: true,
    },
  });

  /*   await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  }); */

  //update data => db

  /*  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  

  //read data <= db

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });*/
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
