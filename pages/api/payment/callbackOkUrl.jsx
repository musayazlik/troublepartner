import Order from "@/models/orders";
import Users from "@/models/users";
import dbConnect from "@/utils/dbconnect";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const orderData = await Order.findOneAndUpdate(
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

    const userData = await Users.findOneAndUpdate(
      { _id: orderData.user.id },
      { memberType: "premium", premiumTime: Date.now() + 2592000000 },
      { new: true }
    );

    res.writeHead(302, {
      Location: "/payment/success",
    });
    res.end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
