import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
import Iyzipay from "iyzipay";

export default async function handler(req, res) {
  var iyzipay = new Iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: "https://sandbox-api.iyzipay.com",
  });

  const basketItems = [
    {
      id: "BI101",
      name: "Premium Paket",
      category1: "Paket",
      itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
      price: req.body.paymentMethod === "monthly" ? 4.99 : 49.9,
    },
  ];

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const payment = await Payment.find({}).populate({
          path: "user",
          model: Users,
          select: ["name", "image", "memberType"],
        });

        res.status(200).json({ data: payment });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }

      break;
    case "POST":
      try {
        let request = {
          price: req.body.paymentMethod === "monthly" ? 4.99 : 49.9,
          locale: Iyzipay.LOCALE.EN,
          paidPrice: req.body.paymentMethod === "monthly" ? 4.99 : 49.9,
          currency: Iyzipay.CURRENCY.USD,
          paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
          callbackUrl: process.env.APP_URL + "/api/payment",
          cancelUrl: process.env.APP_URL,
          buyer: {
            id: req.body.user.id,
            name: req.body.surname,
            surname: req.body.surname,
            email: req.body.user.email,
            identityNumber: "11111111111",
            registrationAddress: req.body.address,
            ip: "1.1.1.1",
            city: req.body.city,
            country: req.body.country,
          },
          shippingAddress: {
            contactName: req.body.name + " " + req.body.surname,
            city: req.body.city,
            country: req.body.country,
            address: req.body.address,
          },
          billingAddress: {
            contactName: req.body.name + " " + req.body.surname,
            city: req.body.city,
            country: req.body.country,
            address: req.body.address,
          },
          basketItems,
        };

        iyzipay.checkoutFormInitialize.create(request, function (err, result) {
          if (err) {
            res.status(400).json({ message: err.message });
          } else {
            res.status(200).json({ data: result });
          }
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request" });
  }
}
