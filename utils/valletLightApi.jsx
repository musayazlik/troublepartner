import axios from "axios";
import crypto from "crypto";

const userName = process.env.Vallet_UserName;
const password = process.env.Vallet_Password;
const shopCode = process.env.Vallet_ShopCode;

const ValletLightApi = () => {
  const postData = {
    userName: process.env.Vallet_UserName,
    password: process.env.Vallet_Password,
    shopCode: process.env.Vallet_ShopCode,
    productName: "dfgdffgdfg",
    productData: "gdfgfdgfd",
    productType: "DIJITAL_URUN",
    productsTotalPrice: "10",
    orderPrice: "10",
    currency: "USD",
    orderId: "123456789",
    locale: "en",
    buyerName: "dfgdfgdfg",
    buyerSurName: "dfgdfgdfg",
    buyerGsmNo: "05318345214",
    buyerIp: "1.1.1.1",
    buyerMail: "musayazlik@sdffsd.com",
    buyerAdress: "dfgdfgdfgdfg",
    buyerCountry: "TR",
    buyerCity: "dfgdfgdfg",
    buyerDistrict: "dfgdfgdfg",
    callbackOkUrl: "https://www.websiteniz.com/payment-ok",
    callbackFailUrl: "https://www.websiteniz.com/payment-fail",
    module: "NATIVE_NODEJS",
    hash: generateHash("123456789"),
  };
};

export default ValletLightApi;
