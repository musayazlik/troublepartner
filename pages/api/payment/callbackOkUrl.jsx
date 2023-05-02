import Order from "@/models/orders";
import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  await dbConnect();

  try {
    await Order.findOneAndUpdate(
      { orderId: req.body.orderId },
      {
        paymentStatus: "paymentOk",
        paymentType: req.body.paymentType,
        valletOrderId: req.body.valletOrderId,
        valletOrderNumber: req.body.valletOrderNumber,
        paymentTime: req.body.paymentTime,
      },
      { new: true }
    );

    await Users.findOneAndUpdate(
      { _id: new ObjectId(req.body.conversationId) },
      { memberType: "premium", premiumTime: Date.now() + 2592000000 },
      { new: true }
    );

    res.writeHead(302, {
      Location: "/payment/success",
    });
    res.end();
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
}
