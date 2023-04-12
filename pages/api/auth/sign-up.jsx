import dbConnect from "@/utils/dbconnect";
import User from "@models/users";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    await User.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
      role: "user",
      memberType: "free",
      jobTitle: "user",
      securityStatus: false,
      emailVerified: false,
      image: "/images/default-user.png",
    });

    return res.status(200).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
