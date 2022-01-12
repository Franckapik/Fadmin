// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        comment_id: data.id,
      },
    });
    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(403).json({ err: "Error occured while deleting a comment." });
  }
};
