import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const emailTemplate = `
      <h1>OTP Verification</h1>
      <p>Your OTP code is: <strong>${otp}</strong></p>
    `;

    await transporter.sendMail({
      from: '"Event Hive" <event.hive.app@gmail.com>',
      to: email,
      subject: "OTP Verification",
      html: emailTemplate,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
