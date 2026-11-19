import { Link } from "@tanstack/react-router";
import { site } from "~/content/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </Link>
        <ul className="hidden gap-8 text-sm text-fog-300 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-fog-100">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${site.email}`}
          className="rounded-full border border-accent/40 px-4 py-1.5 text-sm text-accent transition-colors hover:bg-accent hover:text-ink-950"
        >
          Say hello
        </a>
      </nav>
    </header>
  );
}
