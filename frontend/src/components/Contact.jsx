import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Send } from "lucide-react";
import SocialLinks from "./SocialLinks";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialState = { name: "", email: "", subject: "", message: "" };
// Honeypot field name — real users never see or fill this input.
const HONEYPOT_FIELD = "company_website";

function validate(values) {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.subject.trim() || values.subject.trim().length < 3) {
    errors.subject = "Give this message a subject.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam bots tend to fill every field, including hidden ones.
    if (honeypot) return;

    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("loading");
    try {
      await axios.post(`${API_URL}/api/contact`, values);
      setStatus("success");
      toast.success("Message sent successfully! I'll get back to you soon.");
      setValues(initialState);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("idle");
      const message =
        err.response?.data?.message || "Something went wrong. Please try again in a moment.";
      toast.error(message);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Jane Doe" },
    { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
    { name: "subject", label: "Subject", type: "text", placeholder: "Let's collaborate" },
  ];

  return (
    <section id="contact" className="section">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading mt-3">
            Have a Project in Mind? Let&rsquo;s Build Something.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
            Whether it&rsquo;s a collaboration, opportunity, or just a conversation, my inbox is
            always open.
          </p>
          <SocialLinks className="mt-8" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="card p-6 md:p-8"
        >
          {/* Honeypot: hidden from real users, catches basic bots */}
          <input
            type="text"
            name={HONEYPOT_FIELD}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className={field.name === "subject" ? "sm:col-span-2" : ""}>
                <label htmlFor={field.name} className="mb-2 block text-xs text-ink-muted">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full rounded-xl border bg-base-raised px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent-violet/60 ${
                    errors[field.name] ? "border-red-500/60" : "border-base-border"
                  }`}
                  aria-invalid={Boolean(errors[field.name])}
                />
                {errors[field.name] && (
                  <p className="mt-1.5 text-xs text-red-400">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-xs text-ink-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                placeholder="Tell me a bit about what you're building..."
                className={`w-full resize-none rounded-xl border bg-base-raised px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent-violet/60 ${
                  errors.message ? "border-red-500/60" : "border-base-border"
                }`}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "loading" ? (
              <>
                Sending <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>

          {status === "success" && (
            <p className="mt-4 text-sm text-accent-glow">
              Message sent successfully! I&rsquo;ll get back to you soon.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
