import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
const vallet = require("fast-vallet");

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
        console.log(req.body);
        // const generateHash = (string) => {
        //   const hash = crypto
        //     .createHash("sha1")
        //     .update(
        //       userName +
        //         password +
        //         shopCode +
        //         string +
        //         process.env.Vallet_HashKey
        //     )
        //     .digest("hex");
        //   return Buffer.from(hash, "hex").toString("base64");
        // };

        // const hashdata = await generateHash(
        //   "123456789" +
        //     "USD" +
        //     "10" +
        //     "10" +
        //     "DIJITAL_URUN" +
        //     "https://www.websiteniz.com/payment-ok" +
        //     "https://www.websiteniz.com/payment-fail"
        // );

        // const postData = {
        //   userName: process.env.Vallet_UserName,
        //   password: process.env.Vallet_Password,
        //   shopCode: process.env.Vallet_ShopCode,
        //   productName: "dfgdffgdfg",
        //   productData: "gdfgfdgfd",
        //   productType: "DIJITAL_URUN",
        //   productsTotalPrice: "10",
        //   orderPrice: "10",
        //   currency: "USD",
        //   orderId: "123456789",
        //   locale: "en",
        //   buyerName: "dfgdfgdfg",
        //   buyerSurName: "dfgdfgdfg",
        //   buyerGsmNo: "05318345214",
        //   buyerIp: "1.1.1.1",
        //   buyerMail: "musayazlik@sdffsd.com",
        //   buyerAdress: "dfgdfgdfgdfg",
        //   buyerCountry: "TR",
        //   buyerCity: "dfgdfgdfg",
        //   buyerDistrict: "dfgdfgdfg",
        //   callbackOkUrl: "https://www.websiteniz.com/payment-ok",
        //   callbackFailUrl: "https://www.websiteniz.com/payment-fail",
        //   module: "NATIVE_NODEJS",
        //   hash: hashdata,
        // };

        // axios({
        //   method: "post",
        //   url: "https://www.vallet.com.tr/api/v1/create-payment-link",
        //   data: {
        //     userName: process.env.Vallet_UserName,
        //     password: process.env.Vallet_Password,
        //     shopCode: process.env.Vallet_ShopCode,
        //   },
        // })
        //   .then((response) => {
        //     console.log(response.data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

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
          conversationId: "DIJITAL_URUN",
          buyerName: "buyerName",
          buyerSurName: "buyerSurName",
          buyerGsmNo: "buyerGsmNo",
          buyerMail: "buyerEmail@gmail.com",
          buyerIp: "124.432.423",
          buyerAdress: "buyerAdress",
          BuyerCountry: "BuyerCountry",
          BuyerCity: "BuyerCity",
          buyerDistrict: "buyerDistrict",
          callbackOkUrl: "http://localhost/callbackOkUrl",
          callbackFailUrl: "http://localhost/callbackFailUrl",
        };

        vallet.createPaymentLink(data, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ data: res });
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
