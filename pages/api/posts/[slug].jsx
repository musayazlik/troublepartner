import { ObjectId } from "mongodb";
import Post from "@/models/posts";
import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
import Comment from "@/models/comments";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({
          slug: req.query.slug,
        })
          .populate({
            path: "user",
            model: Users,
            select: ["name", "surname", "image", "role", "memberType"],
          })
          .select("-__v");

        if (posts.length === 0) {
          return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ data: posts });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request" });
      break;
  }
}
