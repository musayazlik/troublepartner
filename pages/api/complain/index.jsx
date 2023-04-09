import dbConnect from "@/utils/dbconnect";
import Complainant from "@/models/complainants";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const complainants = await Complainant.find({});

        res.status(200).json({ data: complainants });
      } catch (error) {
        res.status(400).json({ message: message.error });
      }
      break;
    case "POST":
      try {
        const data = {
          elementId: req.body.id,
          elementType: req.body.element,
        };

        const complainant = await Complainant.create(data);

        res.status(201).json({ data: complainant });
      } catch (error) {
        res.status(400).json({ message: message.error });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request" });
      break;
  }
}
