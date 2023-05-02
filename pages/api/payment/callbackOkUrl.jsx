import Order from "@/models/orders";
import User from "@/models/users";
import dbConnect from "@/utils/dbconnect";

export default async function handler(req, res) {
  await dbConnect();

  console.log(req);

  try {
    if (req.body.status === "success") {
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

      await User.findOneAndUpdate(
        { _id: orderData.user.id },
        { memberType: "premium", premiumTime: Date.now() + 2592000000 },
        { new: true }
      );

      res.writeHead(302, {
        Location: "/payment/success",
      });
      res.end();
    } else {
      res.redirect(`${process.env.APP_URL}/payment/fail`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
