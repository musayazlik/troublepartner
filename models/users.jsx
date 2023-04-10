import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://i.pravatar.cc/150?img=1",
  },
  role: {
    type: String,
    default: "user",
  },
  memberType: {
    type: String,
    default: "free",
  },
  jobTitle: {
    type: String,
    default: "user",
  },
  securityStatus: {
    type: Boolean,
    default: "false",
  },
});

export default mongoose.models.Users || mongoose.model("Users", userSchema);
