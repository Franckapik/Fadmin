import prisma from "../../../prisma/prisma";

export default async (req, res) => {
  const data = req.body;
  try {
    const deletePost = await prisma.post.delete({
      where: {
        post_id: data.id,
      },
    });
    console.info("Deleted post", deletePost.post_title, deletePost.post_id);

    res.status(200).json(deletePost);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: "Error occured while deleting a post : " + err });
  }
};
