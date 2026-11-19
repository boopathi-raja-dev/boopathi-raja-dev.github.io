import { Link } from "@tanstack/react-router";
import { site } from "~/content/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-950/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold text-white"
        >
          <img
            src="/avatar.webp"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full border border-ink-700 object-cover"
          />
          <span className="font-mono text-base text-accent">&lt;/&gt;</span>
          {site.name}
        </Link>
        <div className="flex items-center gap-6 text-[15px]">
          <ul className="hidden gap-6 text-fog-200 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            className="rounded-lg border border-accent px-4 py-2 font-semibold text-accent transition-colors hover:bg-accent hover:text-ink-950"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
