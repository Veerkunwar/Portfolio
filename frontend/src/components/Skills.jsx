import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-kicker">Tech Stack</p>
      <h2 className="section-heading mt-3">Tools I reach for.</h2>

      <div className="mt-12 flex flex-col gap-12">
        {skillGroups.map((group, gi) => (
          <div key={group.category}>
            <h3 className="mb-5 font-mono text-sm text-ink-muted">{group.category}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {group.items.map((skill, i) => {
                const Icon = Icons[skill.icon] || Icons.Code2;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: (gi * 0.03 + i * 0.02) % 0.4 }}
                    whileHover={{ y: -4 }}
                    className="card group flex flex-col items-center justify-center gap-3 px-3 py-6 text-center transition-colors duration-200 hover:border-accent-violet/50"
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-ink-muted transition-colors duration-200 group-hover:text-accent-glow"
                    />
                    <span className="text-xs text-ink-muted transition-colors duration-200 group-hover:text-ink">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
