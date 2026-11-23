import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { openCommandMenu } from "~/components/layout/CommandMenu";
import { site } from "~/content/site";
import { cn } from "~/lib/cn";
import { isTouch, onInspectClick, setInspect, useInspect } from "~/lib/inspect";

export function Nav() {
  const [open, setOpen] = useState(false);
  const inspect = useInspect();

  // Inspect mode: outlines each component on hover with its real name and props
  // (styles in app.css); a click opens its source on GitHub. Escape turns it off.
  useEffect(() => {
    if (!inspect) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setInspect(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onInspectClick, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onInspectClick, true);
    };
  }, [inspect]);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
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
            <ul className="hidden gap-6 whitespace-nowrap text-fog-200 lg:flex">
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
              data-inspect-ignore
              onClick={openCommandMenu}
              aria-label="Open command menu"
              title="Search and shortcuts (⌘K / Ctrl+K)"
              className="hidden items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-1.5 font-mono text-xs text-fog-400 transition-colors hover:border-accent hover:text-accent lg:inline-flex"
            >
              <Search aria-hidden="true" className="size-3.5" />
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <button
              type="button"
              aria-pressed={inspect}
              data-inspect-ignore
              onClick={() => setInspect(!inspect)}
              title="Outline each part of the page with its React component; click one to open its source"
              className={cn(
                "hidden rounded-md border px-2.5 py-1.5 font-mono text-xs whitespace-nowrap transition-colors lg:inline-flex",
                inspect
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-ink-700 text-fog-400 hover:border-accent hover:text-accent",
              )}
            >
              &lt;/&gt; Inspect
            </button>
            <a
              href="/resume.pdf"
              className="rounded-lg border border-accent px-4 py-2 font-semibold whitespace-nowrap text-accent transition-colors hover:bg-accent hover:text-ink-950"
            >
              Resume
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="-mr-2 inline-flex p-2 text-fog-200 lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="size-6" />
              ) : (
                <Menu aria-hidden="true" className="size-6" />
              )}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          hidden={!open}
          className={cn(
            "border-t border-line bg-ink-950 lg:hidden",
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
            <li className="mt-2 flex gap-3 border-t border-line pt-4 pb-2">
              <button
                type="button"
                data-inspect-ignore
                onClick={() => {
                  setOpen(false);
                  openCommandMenu();
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink-700 py-2.5 text-fog-100 transition-colors hover:border-accent hover:text-accent"
              >
                <Search aria-hidden="true" className="size-4" /> Search
              </button>
              <button
                type="button"
                aria-pressed={inspect}
                data-inspect-ignore
                onClick={() => {
                  setOpen(false);
                  setInspect(!inspect);
                }}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 font-mono text-sm transition-colors",
                  inspect
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-ink-700 text-fog-100 hover:border-accent hover:text-accent",
                )}
              >
                &lt;/&gt; Inspect
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Outside the header: its backdrop blur would trap a fixed-position child. */}
      <div
        data-inspect-ignore
        className={cn(
          "fixed bottom-5 left-1/2 z-50 flex w-max max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-3 rounded-full border border-accent/50 bg-ink-900 py-1.5 pr-1.5 pl-4 font-mono text-xs text-accent shadow-lg",
          !inspect && "sr-only",
        )}
      >
        <p aria-live="polite">
          {inspect
            ? isTouch()
              ? "Tap a component to see it. Tap again for its source."
              : "Hover a component, click to open its source."
            : ""}
        </p>
        {inspect && (
          <button
            type="button"
            onClick={() => setInspect(false)}
            className="shrink-0 rounded-full border border-accent/50 px-3 py-1 text-accent hover:bg-accent/15"
          >
            Exit
          </button>
        )}
      </div>
    </>
  );
}
