import dbConnect from "@utils/dbconnect";
import Coupons from "@models/coupons";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const coupons = await Coupons.find({});
        res.status(200).json({ data: coupons });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const coupon = await Coupons.create(req.body);
        res.status(201).json({ data: coupon });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case "DELETE":
      try {
        await Coupons.deleteOne({ _id: req.query.id });
        res.status(200).json({ message: "Coupon deleted successfully" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }

      break;

    default:
      res.status(400).json({ message: "Method not allowed" });
      break;
  }
}
