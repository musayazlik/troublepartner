import dbConnect from "@/utils/dbConnect";
import Comment from "@/models/comments";
import Users from "@/models/users";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const comments = await Comment.find({
          post: req.query.postId,
        }).populate({
          path: "user",
          model: Users,
          select: ["name", "image"],
        });
        res.status(200).json({ data: comments, message: "Comments added." });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const comment = await Comment.create(req.body);
        await comment.populate({
          path: "user",
          model: Users,
          select: ["name", "image"],
        });
        res.status(201).json({ data: comment });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deleteComment = await Comment.deleteOne({
          _id: req.query.id,
        });
        res.status(200).json({ message: "Comment deleted" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request" });
      break;
  }
}
