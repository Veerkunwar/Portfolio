import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Code2, Server, Lightbulb, GraduationCap } from "lucide-react";
import { profile, stats } from "../data/siteData";

const focusIcons = [Code2, Server, Lightbulb, GraduationCap];

function StatCounter({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value == null) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="card px-6 py-7 text-center">
      <p className="font-display text-3xl font-medium text-ink md:text-4xl">
        {value == null ? "—" : `${display}${suffix ?? ""}`}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker">About</p>
          <h2 className="section-heading mt-3">A developer who ships.</h2>

          <p className="mt-6 text-base leading-relaxed text-ink-muted">{profile.about.greeting}</p>
          {profile.about.paragraphs.map((p) => (
            <p key={p} className="mt-4 text-base leading-relaxed text-ink-muted">
              {p}
            </p>
          ))}

          <ul className="mt-8 grid grid-cols-2 gap-4">
            {profile.about.focusAreas.map((area, i) => {
              const Icon = focusIcons[i % focusIcons.length];
              return (
                <li key={area} className="flex items-center gap-3 text-sm text-ink">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-base-border text-accent-glow">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  {area}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="grid grid-cols-2 gap-4 self-start"
        >
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
