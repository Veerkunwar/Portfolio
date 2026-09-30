import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, Eye } from "lucide-react";
import { certificates } from "../data/certificates";
import CertificateModal from "./CertificateModal";

export default function Certificates() {
  const [active, setActive] = useState(null);

  return (
    <section id="certificates" className="section">
      <p className="section-kicker">Certificates</p>
      <h2 className="section-heading mt-3">Credentials &amp; coursework.</h2>

      {certificates.length === 0 ? (
        <div className="card mt-12 flex flex-col items-center gap-3 px-6 py-16 text-center">
          <Award size={28} strokeWidth={1.5} className="text-ink-faint" />
          <p className="text-sm text-ink-muted">
            No certificates added yet.
          </p>
          <p className="font-mono text-xs text-ink-faint">
            Add entries to src/data/certificates.js to populate this gallery
          </p>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="card overflow-hidden"
            >
              <div className="aspect-[4/3] bg-base-raised">
                <img src={cert.image} alt={cert.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base text-ink">{cert.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  {cert.issuer} · {cert.date}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActive(cert)}
                    className="btn-secondary !py-2 !px-4 text-xs"
                  >
                    View <Eye size={13} />
                  </button>
                  {cert.fileUrl && (
                    <a href={cert.fileUrl} download className="btn-ghost !py-2 !px-4 text-xs">
                      Download <Download size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <CertificateModal certificate={active} onClose={() => setActive(null)} />
    </section>
  );
}
