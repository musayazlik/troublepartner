import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
import { uid } from "uid";
const crypto = require("crypto");
const buffer = require("buffer");
import axios from "axios";

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
        const conversationId = uid(10);
        const orderId = uid(10);
        const userName = process.env.VALLET_USERNAME;
        const password = process.env.VALLET_PASSWORD;
        const shopCode = process.env.VALLET_SHOPCODE;
        const domain = process.env.VALLET_DOMAIN;
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.user.email;
        const phone = req.body.phone;
        const country = req.body.country;
        const city = req.body.city;
        const address = req.body.address;

        const stringHash =
          orderId +
          "USD" +
          20 +
          20 +
          "DIJITAL_URUN" +
          `${process.env.APP_URL}/callback/callbackOkUrl` +
          `${process.env.APP_URL}/callback/callbackFailUrl`;
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
          productsTotalPrice: 20,
          orderPrice: 20,
          currency: "USD",
          orderId,
          locale: "locale",
          conversationId,
          buyerName: name,
          buyerSurName: surname,
          buyerGsmNo: phone,
          buyerMail: email,
          buyerIp: "1.1.1.1",
          buyerAdress: address,
          BuyerCountry: country,
          BuyerCity: city,
          callbackOkUrl: `https://${domain}/callback/callbackOkUrl`,
          callbackFailUrl: `https://${domain}/callback/callbackFailUrl`,
        };

        const sha1Hash = crypto
          .createHash("sha1")
          .update(userName + password + shopCode + stringHash + hashKey)
          .digest("hex");
        const packedHash = buffer.Buffer.from(sha1Hash, "hex");
        const base64EncodedHash = packedHash.toString("base64");
        data.hash = base64EncodedHash;

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
