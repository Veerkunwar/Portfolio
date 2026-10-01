
function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail({ name, email, subject, message }) {
  const { RESEND_API_KEY, RECEIVER_EMAIL } = process.env;

  const from =
    process.env.RESEND_FROM_EMAIL ||
    "Portfolio Contact <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!RECEIVER_EMAIL) {
    throw new Error("RECEIVER_EMAIL is not configured.");
  }

  const timestamp = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = [
    "New portfolio contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Submitted: ${timestamp}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
      <h2>New Contact Form Submission</h2>
      <p style="color:#555;">Submitted ${escapeHtml(timestamp)}</p>

      <table cellpadding="6" style="border-collapse: collapse;">
        <tr>
          <td><strong>Name</strong></td>
          <td>${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td><strong>Email</strong></td>
          <td>${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td><strong>Subject</strong></td>
          <td>${escapeHtml(subject)}</td>
        </tr>
      </table>

      <p><strong>Message</strong></p>
      <p style="white-space: pre-wrap; border-left: 3px solid #FF2E4D; padding-left: 12px;">
        ${escapeHtml(message)}
      </p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [RECEIVER_EMAIL],
      reply_to: email,
      subject: `[Portfolio Contact] ${subject}`,
      text,
      html,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Resend API error:", result);
    throw new Error(
      result.message || "Failed to send contact email."
    );
  }

  console.log("Contact email sent successfully:", result.id);
}