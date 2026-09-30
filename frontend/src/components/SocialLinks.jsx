import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "../data/siteData";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export default function SocialLinks({ className = "" }) {
  const entries = Object.entries(socialLinks).filter(([, url]) => Boolean(url));

  if (entries.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {entries.map(([key, url]) => {
        const Icon = ICONS[key];
        const href = key === "email" ? `mailto:${url}` : url;
        return (
          <a
            key={key}
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={key}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-base-border
              text-ink-muted transition-colors duration-200 hover:border-accent-violet/60 hover:text-white"
          >
            <Icon size={17} strokeWidth={1.75} />
          </a>
        );
      })}
    </div>
  );
}
