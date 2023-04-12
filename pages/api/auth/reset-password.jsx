import dbConnect from "@/utils/dbconnect";
import User from "@models/users";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.token !== req.body.token) {
      return res.status(401).json({ message: "Token not found" });
    }

    if (user.tokenExpiration < Date.now()) {
      return res.status(401).json({ message: "Token has expired." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const updatePassword = await User.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          password: hash,
          token: null,
          tokenExpiration: null,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
