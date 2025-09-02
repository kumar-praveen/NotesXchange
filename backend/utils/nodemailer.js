import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { verificationEmailTemplate } from "./verificationEmailTemplate.js";
import { welcomeEmailTemplate } from "./welcomeEmailTemplate.js";
dotenv.config();

export const sendEmail = async (verificationCode, userEmail, userFullname) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: userEmail,
    subject: "NotesXchange Verification Email",
    html: verificationCode
      ? verificationEmailTemplate(verificationCode, userEmail, userFullname)
      : welcomeEmailTemplate(userFullname),
  });
  console.log("Email sent");
};
