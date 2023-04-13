import dbConnect from "@/utils/dbconnect";
import Post from "@models/posts";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      const posts = await Post.find({}).select("slug updatedAt");

      res.status(200).json({ data: posts });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
