import { body, validationResult } from "express-validator";
import dbConnect from "@/utils/dbconnect";
import Contact from "@/models/contact";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        if (req.body.token) {
          await body("name").trim().escape().isLength({ min: 1 }).run(req);
          await body("subject").trim().escape().isLength({ min: 1 }).run(req);
          await body("email").trim().escape().isEmail().run(req);
          await body("message").trim().escape().isLength({ min: 1 }).run(req);

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          /** Contact Database Create */
          await Contact.create({
            name: req.body.name,
            subject: req.body.subject,
            email: req.body.email,
            message: req.body.message,
          });

          // const html = `
          //   <h1>Trouble Partner - Contact Form</h1>
          //   <p><strong>Name:</strong> ${sanitizeHtml(req.body.name)}</p>
          //   <p><strong>Subject:</strong> ${sanitizeHtml(req.body.subject)}</p>
          //   <p><strong>Email:</strong> ${sanitizeHtml(req.body.email)}</p>
          //   <p><strong>Message:</strong> ${sanitizeHtml(req.body.message)}</p>
          // `;

          // await sendMail("contact", process.env.EMAIL_TO, "", html);
          res.status(200).json({ message: "Email sent successfully" });
        } else {
          res.status(400).json({ message: "Token not found" });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
