import { profile } from "../data/siteData";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-base-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-sm text-ink">Designed &amp; Built by {profile.name}</p>
          <p className="text-xs text-ink-faint">Turning ideas into digital experiences.</p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <SocialLinks />
          <p className="font-mono text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
