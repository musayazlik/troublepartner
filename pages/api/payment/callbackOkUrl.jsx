import Order from "@/models/orders";
import User from "@/models/users";
import dbConnect from "@/utils/dbconnect";
import sendMail from "@/utils/sendMail";

export default async function handler(req, res) {
  await dbConnect();

  console.log(req.body.status);
  console.log(req.body.paymentStatus);

  try {
    if (
      req.body.status === "success" ||
      req.body.paymentStatus === "paymentOk"
    ) {
      const orderData = await Order.findOneAndUpdate(
        { orderId: req.body.orderId },
        { paymentStatus: "paymentOk", paymentType: req.body.paymentType },
        { new: true }
      );

      const userData = await User.findOneAndUpdate(
        { _id: orderData.user.id },
        { memberType: "premium", premiumTime: Date.now() + 2592000000 },
        { new: true }
      );

      const html = `
        <h1>Trouble Partner - Payment</h1>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Surname:</strong> ${userData.surname}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Payment Type:</strong> ${orderData.paymentType}</p>
        <p><strong>Payment Status:</strong> ${orderData.paymentStatus}</p>
        <p><strong>Order Id:</strong> ${orderData.orderId}</p>
        <p><strong>Order Date:</strong> ${orderData.orderDate}</p>
        <p><strong>Order Total:</strong> ${orderData.orderTotal}</p>
        <p><strong>Order Status:</strong> ${orderData.orderStatus}</p>
      `;
      sendMail("payment", process.env.EMAIL_TO, "", html);

      const thanksHtml = `
        <h1>Thank you for the premium membership....</h1>
        <p>Thank you for upgrading your membership to premium.</p>
        <p>You can now access all the premium content.</p>
        <p>Enjoy!</p>
      `;

      sendMail("payment", userData.email, "", thanksHtml);

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
