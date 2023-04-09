import { google } from "googleapis";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";
import sanitizeHtml from "sanitize-html";

export default async function handler(req, res) {
  const { method } = req;
  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH2_CLIENT_ID,
    process.env.OAUTH2_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
  });

  // Nodemailer kullanarak e-posta göndermek için yapılandırma
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "musayazlik1997@gmail.com",
      clientId: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
      accessToken: await oAuth2Client.getAccessToken().token,
    },
  });
  switch (method) {
    case "POST":
      try {
        if (req.body.token) {
          await body("name").trim().escape().isLength({ min: 1 }).run(req);
          await body("email").trim().escape().isEmail().run(req);
          await body("message").trim().escape().isLength({ min: 1 }).run(req);

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: "Trouble Partner - Contact Form",
            text: `
						Name: ${sanitizeHtml(req.body.name)}  
						Email: ${sanitizeHtml(req.body.email)} 
						Message: ${sanitizeHtml(req.body.message)}`,
          };

          // E-postayı gönder
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              res.status(200).json({ message: "Email sent" });
            }
          });
        } else {
          res.status(400).json({ message: "Token not found" });
        }
      } catch (error) {
        res.status(400).json({ message: message.error });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
