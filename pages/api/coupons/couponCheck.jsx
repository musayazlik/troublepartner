import dbConnect from "@/utils/dbconnect";
import Coupons from "@/models/coupons";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect;

  switch (method) {
    case "GET":
      try {
        const coupons = await Coupons.find({
          name: req.query.id,
        });
        let discountedPrice;
        if (!coupons)
          return res.status(400).json({ message: "Coupon not found" });

        if (coupons[0].expiry < Date.now())
          return res.status(400).json({ message: "Coupon expired" });

        if (coupons[0].usedNumber >= coupons.piecesNumber)
          return res.status(400).json({ message: "Coupon is full" });

        if (coupons[0].status === false)
          return res.status(400).json({ message: "Coupon is not active" });

        if (req.query.status === "monthly") {
          discountedPrice = 4.99 - (4.99 * coupons[0].discount) / 100;
        } else {
          discountedPrice = 49.99 - (49.99 * coupons[0].discount) / 100;
        }

        res.status(200).json({ data: discountedPrice.toFixed(2).toString() });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }

      break;

    default:
      res.status(400).json({ message: "Method not allowed" });
      break;
  }
}
