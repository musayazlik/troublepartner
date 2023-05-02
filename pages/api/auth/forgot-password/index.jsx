import User from "@models/users";
import dbConnect from "@/utils/dbconnect";
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();
import sendMail from "@/utils/sendMail";

export default async function handler(req, res) {
  const { email } = req.body;

  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const token = uuid;
    const isEmail = User.findOne({ email: email });
    if (!isEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        tokenExpiration: Date.now() + 3600000,
      },
      { new: true }
    );

    await sendMail("reset", email, token);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
