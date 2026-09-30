import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${certificate.title} preview`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="card max-h-[85vh] w-full max-w-xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-base-border px-5 py-4">
              <div>
                <h3 className="font-display text-lg text-ink">{certificate.title}</h3>
                <p className="text-xs text-ink-muted">
                  {certificate.issuer} · {certificate.date}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="text-ink-muted transition-colors hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-auto bg-base-raised">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full object-contain"
              />
            </div>

            {certificate.fileUrl && (
              <div className="flex justify-end border-t border-base-border px-5 py-4">
                <a href={certificate.fileUrl} download className="btn-secondary !py-2.5">
                  Download Certificate <Download size={15} />
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
