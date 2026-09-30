import { validationResult } from "express-validator";
import { sendContactEmail } from "../utils/mailer.js";

export async function submitContactForm(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { name, email, subject, message, company_website: honeypot } = req.body;

    // Honeypot triggered: silently pretend success so bots gain no signal.
    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      });
    }

    await sendContactEmail({ name, email, subject, message });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (err) {
    return next(err);
  }
}
