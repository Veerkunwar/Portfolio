import rateLimit from "express-rate-limit";

// Limits each IP to 5 contact-form submissions per 15 minutes.
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent from this device. Please try again later.",
  },
});
