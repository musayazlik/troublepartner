const nodemailer = require("nodemailer");

const sendMail = async (type, email, token = "", html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_TO,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions;

  switch (type) {
    case "verify":
      mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Verify your email",
        html: `
        <h1>Verify your email</h1>
        <p>Click the link below to verify your email</p>
        <a href="${process.env.APP_URL}/auth/verify-email?token=${token}">Verify Email</a>
      `,
      };
      break;
    case "reset":
      mailOptions = {
        from: "musayazlik97@gmail.com",
        to: email,
        subject: "Subject of the email",
        text: "Content of the email",
      };

      break;
    case "welcome":
      "";
      break;
    case "order":
      mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Thanks!",
        html: html,
      };
      break;
    case "contact":
      mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Contact",
        html: html,
      };
      break;
    case "payment":
      mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Payment",
        html: html,
      };
      break;
    default:
      break;
  }

  // e-posta gönderme işlemi
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("E-posta gönderildi: " + info.response);
    }
  });
};

export default sendMail;
