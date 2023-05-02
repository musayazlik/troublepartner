import { getSession } from "next-auth/react";
import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";

export async function IsAdminMiddleware(req, res) {
  const session = await getSession({ req, res });
  if (!session || session.user.role !== "admin") {
    return false;
  }

  await dbConnect();
  const user = await Users.findOne({ email: session.user.email });
  if (!user || user.role !== "admin") {
    return false;
  }

  return true;
}
