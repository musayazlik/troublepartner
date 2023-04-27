import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
import Order from "@/models/orders";
import { uid } from "uid";
const crypto = require("crypto");
const buffer = require("buffer");
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;

  console.log(req.body);

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
        const orderId = uid(10);
        const conversationId = req.body.user.id; // User Id
        const userName = process.env.VALLET_USERNAME;
        const password = process.env.VALLET_PASSWORD;
        const shopCode = process.env.VALLET_SHOPCODE;
        const domain = process.env.VALLET_DOMAIN;
        const callbackOkUrl = `${process.env.APP_URL}/api/payment/callbackOkUrl`;
        const callbackFailUrl = `${process.env.APP_URL}/payment/`;
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.user.email;
        const phone = req.body.phone;
        const country = req.body.country;
        const city = req.body.city;
        const address = req.body.address;

        const stringHash =
          orderId +
          "TRY" +
          1 +
          1 +
          "DIJITAL_URUN" +
          callbackOkUrl +
          callbackFailUrl;
        const hashKey = process.env.VALLET_HASHKEY;

        const data = {
          referer: domain, // Referer Domain example.com
          hash: hashKey, // Api Hash Anahtarı
          userName: userName, // Apı User
          password: password, // Api Key
          shopCode: shopCode, // Api Mağaza Kodu
          productName: "Trouble Partner Premium",
          productData: "Trouble Partner Premium",
          productType: "DIJITAL_URUN",
          productsTotalPrice: 1,
          orderPrice: 1,
          currency: "TRY",
          orderId,
          locale: "locale",
          buyerName: name,
          buyerSurName: surname,
          buyerGsmNo: phone,
          buyerMail: email,
          buyerIp: "1.1.1.1",
          buyerAdress: address,
          BuyerCountry: country,
          BuyerCity: city,
          callbackOkUrl,
          callbackFailUrl,
        };

        const sha1Hash = crypto
          .createHash("sha1")
          .update(userName + password + shopCode + stringHash + hashKey)
          .digest("hex");
        const packedHash = buffer.Buffer.from(sha1Hash, "hex");
        const base64EncodedHash = packedHash.toString("base64");
        data.hash = base64EncodedHash;

        await Order.create({
          orderId,
          user: {
            id: req.body.user.id,
            name,
            surname,
            email,
            phone,
            country,
            city,
            address,
          },
          amount: 1,
          currency: "TRY",
          paymentStatus: "pending",
          paymentType: "vallet",
        });

        axios({
          method: "post",
          url: "https://www.vallet.com.tr/api/v1/create-payment-link",
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
            Referer: data.referer,
          },
        })
          .then((response) => {
            res.status(200).json({ data: response.data });
          })
          .catch((error) => {
            res.status(400).json({ message: error.message });
          });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request" });
  }
}
