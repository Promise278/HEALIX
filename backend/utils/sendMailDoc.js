const Brevo = require("@getbrevo/brevo");
require("dotenv").config();

const client = new Brevo.TransactionalEmailsApi();
client.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

/**
 * @param {string} name - user's name
 * @param {string} email - user's email
 */
async function sendWelcomeEmail(name, email, role = "doctor") {
  const clientURL = "http://localhost:3000/";

  const htmlContent = `
<!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Healix</title></head>
  <body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;background-color:#f5f5f5;">
    <div style="background:linear-gradient(to right,#00B4DB,#0083B0);padding:30px;text-align:center;border-radius:12px 12px 0 0;">
      <img src="https://i.postimg.cc/KjcKGDk4/Chat-GPT-Image-Sep-24-2025-03-34-29-PM.png" alt="Healix Logo" style="width:80px;height:80px;margin-bottom:15px;border-radius:50%;background-color:white;padding:8px;">
      <h1 style="color:white;margin:0;font-size:28px;font-weight:600;">Welcome to Healix!</h1>
      <p style="color:#e3f2fd;margin-top:8px;font-size:15px;">Your trusted telemedical companion</p>
    </div>

    <div style="background-color:#ffffff;padding:35px;border-radius:0 0 12px 12px;box-shadow:0 4px 15px rgba(0,0,0,0.05);">
      <p style="font-size:18px;color:#0083B0;"><strong>Hello ${name},</strong></p>
      <p>We’re delighted to welcome you to <strong>Healix</strong> — where healthcare meets convenience. With Healix, you can connect with certified doctors, get medical advice, and manage your health securely from anywhere.</p>

      <div style="background-color:#f9fafb;padding:25px;border-radius:10px;margin:25px 0;border-left:4px solid #00B4DB;">
        <p style="font-size:16px;margin:0 0 15px 0;"><strong>Here’s how to get started:</strong></p>
        <ul style="padding-left:20px;margin:0;">
          <li style="margin-bottom:10px;">Create your doctor profile and verify your credentials</li>
          <li style="margin-bottom:10px;">Get verified by our admin team</li>
          <li style="margin-bottom:10px;">Start receiving patient consultations</li>
          <li style="margin-bottom:0;">Access your dashboard and manage appointments</li>
        </ul>
      </div>

      <div style="text-align:center;margin:30px 0;">
        <a href="${clientURL}" style="background:linear-gradient(to right,#00B4DB,#0083B0);color:white;text-decoration:none;padding:12px 30px;border-radius:50px;font-weight:500;display:inline-block;">Go to Healix</a>
      </div>

      <p style="margin-bottom:5px;">We’ll review your details shortly and confirm your verification status.</p>
      <p style="margin-top:0;">Stay healthy, stay connected 💙</p>

      <p style="margin-top:25px;margin-bottom:0;">Best regards,<br><strong>The Healix Team</strong></p>
    </div>

    <div style="text-align:center;padding:20px;color:#999;font-size:12px;">
      <p>© 2025 Healix. All rights reserved.</p>
      <p>
        <a href="#" style="color:#0083B0;text-decoration:none;margin:0 10px;">Privacy Policy</a>
        <a href="#" style="color:#0083B0;text-decoration:none;margin:0 10px;">Terms of Service</a>
        <a href="#" style="color:#0083B0;text-decoration:none;margin:0 10px;">Contact Support</a>
      </p>
    </div>
  </body></html>
`;

  const sendSmtpEmail = {
    to: [{ email }],
    sender: { email: process.env.EMAIL_SENDER, name: "Healix" },
    subject: "Welcome to Healix!",
    htmlContent,
  };

  try {
    await client.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Welcome email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = sendWelcomeEmail;