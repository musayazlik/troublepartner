import AWS from "aws-sdk";

const sendMail = async (type, email, token = "", html) => {
  const ses = new AWS.SES({
    region: "eu-central-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  let params = {};

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
      params = {
        Destination: {
          ToAddresses: [email], // Gönderilecek e-posta adresi
        },
        Message: {
          Body: {
            Html: {
              Data: `
              <h1>Reset your password</h1>
              <p>Click the link below to reset your password</p>
              <a href="${process.env.APP_URL}/auth/reset-password?token=${token}">Reset Password</a>
            `,
            },
          },
          Subject: {
            Data: "Password Reset ", // E-posta konusu
          },
        },
        Source: "troublepartner@yandex.com", // Gönderen e-posta adresi
      };

      break;
    case "welcome":
      mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Welcome to the team",
        html: `
        <h1>Welcome to the team</h1>
        <p>Click the link below to verify your email</p>
        <a href="${process.env.APP_URL}/auth/verify-email?token=${token}">Verify Email</a>
      `,
      };
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

  ses.sendEmail(params, function (err, data) {
    if (err) console.log(err, err.stack);
  });
};

export default sendMail;
