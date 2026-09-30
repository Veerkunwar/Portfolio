import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile, resume } from "../data/siteData";
import TypingText from "./TypingText";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-radial-fade pb-20 pt-28 md:pb-24 md:pt-24"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-12 px-6 sm:gap-16 md:grid-cols-[1.15fr_0.85fr] md:px-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-6 font-mono text-sm text-accent-glow">
            <span aria-hidden="true">~/</span>{profile.location.toLowerCase()} — available for work
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {profile.heroHeadline}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {profile.heroSubheading}
          </motion.p>

          <motion.div variants={item} className="mt-5 flex items-center gap-2 font-mono text-sm text-ink-muted">
            <span className="text-ink-faint">const role =</span>
            <TypingText words={profile.typingRoles} />
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              Explore My Work
              <ArrowUpRight size={16} />
            </a>
            <a
              href={resume.filePath}
              download={resume.fileName}
              className="btn-secondary"
            >
              Download Resume
              <Download size={16} />
            </a>
            <a href="#contact" className="btn-ghost">
              Let&rsquo;s Talk
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-[340px]"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-accent-gradient opacity-20 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-base-border bg-base-surface">
            <img
              src={profile.portraitSrc}
              alt={profile.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="hidden h-full w-full flex-col items-center justify-center gap-3 text-ink-faint">
              <span className="font-display text-5xl">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span className="font-mono text-xs">add portrait at {profile.portraitSrc}</span>
            </div>
          </div>
          <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-xl border border-base-border bg-base-surface/90 px-4 py-3 text-center font-mono text-xs text-ink-muted backdrop-blur">
            {profile.role} · {profile.location}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ink-faint transition-colors hover:text-ink md:bottom-8"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
