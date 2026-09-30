
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="card group grid grid-cols-1 overflow-hidden md:grid-cols-2 md:even:[&>div:first-child]:order-2"
    >
      {/* Project Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white md:aspect-auto">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "flex";
          }}
        />

        <div className="hidden h-full w-full flex-col items-center justify-center gap-2 text-ink-faint">
          <span className="font-display text-2xl">
            {project.name}
          </span>
          <span className="font-mono text-xs">
            add screenshot at {project.image}
          </span>
        </div>
      </div>

      {/* Project Details */}
      <div className="flex flex-col justify-center p-8 md:p-10">
        <p className="font-mono text-xs text-accent-glow">
          {project.category}
        </p>

        <h3 className="mt-2 font-display text-2xl font-medium text-ink">
          {project.name}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-col gap-1.5">
          {project.features.slice(0, 4).map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-ink-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-glow" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary !py-2.5"
            >
              Live Demo <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="btn-primary !py-2.5 cursor-not-allowed opacity-40">
              Live Demo <ArrowUpRight size={15} />
            </span>
          )}

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary !py-2.5"
            >
              View Source Code <Github size={15} />
            </a>
          ) : (
            <span className="btn-secondary !py-2.5 cursor-not-allowed opacity-40">
              View Source Code <Github size={15} />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}