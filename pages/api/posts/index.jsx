import Post from "@/models/posts";
import dbConnect from "@/utils/dbConnect";
import Users from "@/models/users";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({}).populate({
          path: "user",
          model: Users,
          select: ["name", "image"],
        });

        res.status(200).json({ data: posts });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
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
