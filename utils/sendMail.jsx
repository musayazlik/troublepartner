const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (type, email, token = "", html) => {
  let messageData = {};
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
      messageData = {
        to: email,
        from: "Trouble Partner <troublepartner@yandex.com>",
        subject: "Reset Password",
        html: `
        <h1>Reset Password</h1>
        <p>Click the link below to reset your password</p>
        <a href="${process.env.APP_URL}/auth/reset-password?token=${token}">Reset Password</a>`,
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
      messageData = {
        to: "troublepartner@yandex.com",
        from: "Trouble Partner <troublepartner@yandex.com>",
        subject: "Contact Form",
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

  sgMail
    .send(messageData)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendMail;
