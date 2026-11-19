import { site } from "~/content/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-800 py-10 text-sm text-fog-500">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 md:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with TanStack Start, React and Motion.
        </p>
        <p>
          <a href={site.links.github} className="hover:text-fog-100">
            GitHub
          </a>
          {" · "}
          <a href={site.links.linkedin} className="hover:text-fog-100">
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
