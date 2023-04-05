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
          _id: ObjectId(req.query.id),
        })
          .populate({
            path: "user",
            model: Users,
            select: ["name", "image"],
          })
          .select("-__v");

        res.status(200).json({ data: posts });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

      try {
        console.log(req.body);
        const post = await Post.create(req.body);
        res.status(201).json({ data: post });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request" });
      break;
  }
}
