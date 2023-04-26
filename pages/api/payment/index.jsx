import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
const vallet = require("fast-vallet");
import { uid } from "uid";

export default async function handler(req, res) {
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
        const uidId = uid(10);
        const data = {
          referer: process.env.APP_URL, // Referer Domain example.com
          hash: process.env.Vallet_HashKey, // Api Hash Anahtarı
          userName: process.env.Vallet_UserName, // Apı User
          password: process.env.Vallet_Password, // Api Key
          shopCode: process.env.Vallet_ShopCode, // Api Mağaza Kodu
          productName: "productName",
          productData: "productData",
          productType: "DIJITAL_URUN",
          productsTotalPrice: 21,
          orderPrice: 20.0,
          currency: "TRY",
          orderId: "20",
          locale: "locale",
          conversationId: uidId,
          buyerName: "buyerName",
          buyerSurName: "buyerSurName",
          buyerGsmNo: "buyerGsmNo",
          buyerMail: "buyerEmail@gmail.com",
          buyerIp: "124.432.423",
          buyerAdress: "buyerAdress",
          BuyerCountry: "BuyerCountry",
          BuyerCity: "BuyerCity",
          buyerDistrict: "buyerDistrict",
          callbackOkUrl: `${process.env.APP_URL}/callbackOkUrl`,
          callbackFailUrl: `${process.env.APP_URL}/callbackFailUrl`,
        };

        vallet.createPaymentLink(data, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Msdfjfjkldjsdfjk");
            console.log(res);
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
