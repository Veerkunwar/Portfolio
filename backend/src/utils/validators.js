import { body } from "express-validator";

export const contactValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters.")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Subject must be between 3 and 150 characters.")
    .escape(),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 10, max: 5000 })
    .withMessage("Message must be between 10 and 5000 characters.")
    .escape(),
  // Honeypot field: real visitors never fill this. If it arrives non-empty, we
  // still return 200 so bots don't learn to adapt, but we skip sending mail.
  body("company_website").optional({ checkFalsy: true }).trim(),
];
