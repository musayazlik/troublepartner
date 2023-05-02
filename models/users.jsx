import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  tokenExpiration: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    required: true,
    default: "/images/default-user.png",
  },
  role: {
    type: String,
    default: "user",
  },
  memberType: {
    type: String,
    default: "free",
  },
  premiumTime: {
    type: Date,
    default: "",
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
