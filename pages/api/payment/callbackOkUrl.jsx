import Order from "@/models/orders";
import User from "@/models/users";
import dbConnect from "@/utils/dbconnect";

export default async function handler(req, res) {
  await dbConnect();

  console.log(req);

  try {
    if (
      req.body.status === "success" ||
      req.body.paymentStatus === "paymentOk"
    ) {
      await Order.findOneAndUpdate(
        { orderId: req.body.orderId },
        { paymentStatus: "paymentOk", paymentType: req.body.paymentType },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: req.body.user.id },
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
