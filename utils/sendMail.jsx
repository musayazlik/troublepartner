// import { google } from "googleapis";
import nodemailer from "nodemailer";

const sendMail = async (type, email, token = "", html) => {
  // const oAuth2Client = new google.auth.OAuth2(
  //   process.env.OAUTH2_CLIENT_ID,
  //   process.env.OAUTH2_CLIENT_SECRET,
  //   "https://developers.google.com/oauthplayground"
  // );

  // oAuth2Client.setCredentials({
  //   refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
  // });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: true,
    },
    auth: {
      user: "musayazlik1997@gmail.com",
      pass: "sagxxtyhlikexkos",
      // clientId: process.env.OAUTH2_CLIENT_ID,
      // clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      // refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
      // accessToken: await oAuth2Client.getAccessToken().token,
      // expires: 1484314697598,
    },
  });

  let mailOptions = {};

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
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Password Reset",
        html: `
        <h1>Reset your password</h1>
        <p>Click the link below to reset your password</p>
        <a href="${process.env.APP_URL}/auth/reset-password?token=${token}">Reset Password</a>
      `,
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

  await transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
    } else {
      return true;
    }
  });
};

export default sendMail;
