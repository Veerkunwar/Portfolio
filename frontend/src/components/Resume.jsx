import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { resume } from "../data/siteData";

export default function Resume() {
  const [available, setAvailable] = useState(null); // null = checking, true/false = known

  useEffect(() => {
    let cancelled = false;
    fetch(resume.filePath, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="resume" className="section">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker">Resume</p>
          <h2 className="section-heading mt-3">More Than Just a Developer.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
            Explore my journey, technical experience, education, and skills.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {available ? (
              <>
                <a href={resume.filePath} download={resume.fileName} className="btn-primary">
                  Download Resume <Download size={16} />
                </a>
                <a href={resume.filePath} target="_blank" rel="noreferrer" className="btn-secondary">
                  Open in New Tab <ExternalLink size={16} />
                </a>
              </>
            ) : (
              <p className="font-mono text-sm text-ink-faint">
                Resume coming soon — add it at{" "}
                <code className="text-ink-muted">public{resume.filePath}</code>
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="card overflow-hidden"
        >
          {available ? (
            <iframe
              src={resume.filePath}
              title="Resume preview"
              className="h-[420px] w-full border-0"
            />
          ) : (
            <div className="flex h-[420px] w-full flex-col items-center justify-center gap-3 px-6 text-center text-ink-faint">
              <FileText size={32} strokeWidth={1.5} />
              <p className="font-mono text-xs">
                {available === null
                  ? "Checking for resume..."
                  : `Add your PDF at public${resume.filePath} to enable the preview`}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}