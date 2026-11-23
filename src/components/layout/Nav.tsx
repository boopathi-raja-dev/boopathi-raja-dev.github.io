import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "~/content/site";
import { cn } from "~/lib/cn";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [inspect, setInspect] = useState(false);

  // Inspect mode: outlines each component on hover with its real name and props
  // (styles in app.css). Escape turns it off.
  useEffect(() => {
    document.documentElement.classList.toggle("inspect-on", inspect);
    if (!inspect) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setInspect(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspect]);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-ink-950/90 backdrop-blur"
      data-inspect="Nav"
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold whitespace-nowrap text-white"
        >
          <img
            src="/avatar.webp"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full border border-ink-700 object-cover"
          />
          <span className="hidden font-mono text-base text-accent sm:inline">&lt;/&gt;</span>
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
          <button
            type="button"
            aria-pressed={inspect}
            onClick={() => setInspect((v) => !v)}
            title="Outline each part of the page with its React component name"
            className={cn(
              "inspect-toggle hidden rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors md:inline-flex",
              inspect
                ? "border-accent bg-accent/15 text-accent"
                : "border-ink-700 text-fog-400 hover:border-accent hover:text-accent",
            )}
          >
            &lt;/&gt; Inspect
          </button>
          <a
            href="/resume.pdf"
            className="rounded-lg border border-accent px-4 py-2 font-semibold text-accent transition-colors hover:bg-accent hover:text-ink-950"
          >
            Resume
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="-mr-2 inline-flex p-2 text-fog-200 md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>
      </nav>

      <p
        aria-live="polite"
        className={cn(
          "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-accent/50 bg-ink-900 px-4 py-2 font-mono text-xs text-accent shadow-lg",
          !inspect && "sr-only",
        )}
      >
        {inspect ? "Inspect mode: hover any part of the page. Esc to exit." : ""}
      </p>

      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "border-t border-line bg-ink-950 md:hidden",
          open && "animate-[rise_0.25s_ease-out]",
        )}
      >
        <ul className="container-page flex flex-col py-2">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg text-fog-100 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
