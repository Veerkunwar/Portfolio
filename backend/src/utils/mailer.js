import nodemailer from "nodemailer";

let transporter;

/**
 * Lazily creates a single reusable SMTP transporter from environment variables.
 */
function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS in your .env file."
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465, // true for port 465, false for other ports (STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends the contact-form notification email to RECEIVER_EMAIL,
 * with the sender's address set as reply-to for a direct reply.
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const receiver = process.env.RECEIVER_EMAIL;
  if (!receiver) {
    throw new Error("RECEIVER_EMAIL is not configured in your .env file.");
  }

  const timestamp = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = [
    `New portfolio contact form submission`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Submitted: ${timestamp}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin-bottom: 4px;">New Contact Form Submission</h2>
      <p style="color:#555; margin-top:0;">Submitted ${escapeHtml(timestamp)}</p>
      <table cellpadding="6" style="border-collapse: collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Subject</strong></td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <p style="margin-top: 16px;"><strong>Message</strong></p>
      <p style="white-space: pre-wrap; border-left: 3px solid #FF2E4D; padding-left: 12px;">${escapeHtml(
        message
      )}</p>
    </div>
  `;

  const mailer = getTransporter();

  await mailer.sendMail({
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: receiver,
    replyTo: `"${name}" <${email}>`,
    subject: `[Portfolio Contact] ${subject}`,
    text,
    html,
  });
}
