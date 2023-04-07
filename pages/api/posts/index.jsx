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
        const posts = await Post.find({}).populate({
          path: "user",
          model: Users,
          select: ["name", "image"],
        });

        for (let i = 0; i < posts.length; i++) {
          const numComments = await Comment.countDocuments({
            post: posts[i]._id,
          });

          posts[i] = {
            ...posts[i]._doc,
            numComments,
          };
        }

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
    case "PATCH":
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.body.id,
          { $set: { text: req.body.text } },
          { new: true, runValidators: true }
        );
        res.status(200).json({ data: updatedPost });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request" });
      break;
  }
}
