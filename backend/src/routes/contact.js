import { Router } from "express";
import { contactRateLimiter } from "../middleware/rateLimiter.js";
import { contactValidationRules } from "../utils/validators.js";
import { submitContactForm } from "../controllers/contactController.js";

const router = Router();

router.post("/", contactRateLimiter, contactValidationRules, submitContactForm);

export default router;
