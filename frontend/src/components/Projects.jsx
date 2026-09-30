import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="section-kicker">Featured Projects</p>
      <h2 className="section-heading mt-3">Things I&rsquo;ve built.</h2>

      <div className="mt-12 flex flex-col gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
