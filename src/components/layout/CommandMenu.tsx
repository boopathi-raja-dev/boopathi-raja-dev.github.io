import { useNavigate } from "@tanstack/react-router";
import { allCaseStudies } from "content-collections";
import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site } from "~/content/site";
import { cn } from "~/lib/cn";
import { setInspect, useInspect } from "~/lib/inspect";

type Command = {
  id: string;
  group: "Go to" | "Case studies" | "Actions" | "Links";
  label: string;
  hint?: string;
  run: () => unknown;
};

/** True when every typed character appears in order ("cpy eml" finds "Copy email"). */
export const fuzzy = (text: string, query: string) => {
  const t = text.toLowerCase();
  let i = 0;
  for (const ch of query.toLowerCase().replace(/\s+/g, "")) {
    i = t.indexOf(ch, i);
    if (i === -1) return false;
    i += 1;
  }
  return true;
};

const OPEN_EVENT = "command-menu:open";
/** Opens the command menu from anywhere (e.g. the Nav button). */
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

/**
 * ⌘K / Ctrl+K command menu. Built on the native <dialog> element, so focus
 * trapping, Escape and the backdrop come from the browser. Arrow keys move, Enter
 * runs. Nothing renders inside until it opens, so it costs nothing on page load.
 */
export function CommandMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const inspect = useInspect();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<string | null>(null);

  const show = useCallback(() => {
    setQuery("");
    setActive(0);
    setDone(null);
    setOpen(true);
    dialog.current?.showModal();
  }, []);
  const close = useCallback(() => dialog.current?.close(), []);

  // The list renders after the dialog opens, so focus the search box once it exists.
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // ⌘K / Ctrl+K toggles; the Nav button opens it through an event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dialog.current?.open ? close() : show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [show, close]);

  const goToSection = useCallback(
    (hash: string) => navigate({ to: "/", hash, hashScrollIntoView: { behavior: "smooth" } }),
    [navigate],
  );

  const commands = useMemo<Command[]>(() => {
    const studies = [...allCaseStudies].sort((a, b) => a.order - b.order);
    return [
      { id: "home", group: "Go to", label: "Home", run: () => navigate({ to: "/" }) },
      ...site.nav.map((n) => ({
        id: `nav-${n.href}`,
        group: "Go to" as const,
        label: n.label,
        run: () => goToSection(n.href.replace(/^\/?#/, "")),
      })),
      ...studies.map((s) => ({
        id: `study-${s.slug}`,
        group: "Case studies" as const,
        label: s.label,
        hint: s.title,
        run: () => navigate({ to: "/work/$slug", params: { slug: s.slug } }),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setDone("copy-email");
          } catch {
            window.location.href = `mailto:${site.email}`;
          }
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open resume (PDF)",
        run: () => window.open("/resume.pdf", "_blank", "noopener"),
      },
      {
        id: "inspect",
        group: "Actions",
        label: inspect ? "Turn off Inspect mode" : "Turn on Inspect mode",
        hint: "See each component and open its source",
        run: () => setInspect(!inspect),
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        run: () => window.open(site.links.linkedin, "_blank", "noopener"),
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub",
        run: () => window.open(site.links.github, "_blank", "noopener"),
      },
      {
        id: "source",
        group: "Links",
        label: "This site's source code",
        run: () =>
          window.open(`${site.links.github}/boopathi-raja-dev.github.io`, "_blank", "noopener"),
      },
    ];
  }, [navigate, goToSection, inspect]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    // Best first: the name contains the text, then the description, then a loose match.
    const rank = (c: Command) => {
      if (c.label.toLowerCase().includes(q)) return 0;
      if (`${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q)) return 1;
      return fuzzy(c.label, q) ? 2 : -1;
    };
    return commands
      .map((c, i) => ({ c, i, r: rank(c) }))
      .filter((x) => x.r >= 0)
      .sort((a, b) => a.r - b.r || a.i - b.i)
      .map((x) => x.c);
  }, [commands, query]);

  const run = async (c: Command) => {
    await c.run();
    // Leave "Copied" on screen for a moment before closing.
    if (c.id === "copy-email") setTimeout(close, 700);
    else close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (results.length ? (i + step + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = results[active];
      if (c) void run(c);
    }
  };

  return (
    // Clicking the backdrop closes it; keyboard users have Escape (native to <dialog>).
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape already closes a modal dialog
    <dialog
      ref={dialog}
      aria-label="Command menu"
      data-inspect-ignore
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === dialog.current && close()}
      className="m-auto mt-[12vh] w-[min(560px,calc(100%-32px))] rounded-2xl border border-ink-700 bg-ink-900 p-0 text-fog-100 shadow-[0_24px_60px_rgb(0_0_0/0.5)] backdrop:bg-ink-975/70 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div>
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search aria-hidden="true" className="size-4 shrink-0 text-fog-400" />
            <input
              ref={input}
              role="combobox"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
              aria-label="Type a command or search"
              placeholder="Type a command or search…"
              value={query}
              onKeyDown={onKeyDown}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              className="h-13 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-fog-400"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close command menu"
              className="shrink-0 rounded border border-ink-700 px-1.5 py-0.5 font-mono text-[11px] text-fog-400 hover:border-accent hover:text-accent"
            >
              Esc
            </button>
          </div>

          <div
            id="command-list"
            role="listbox"
            aria-label="Commands"
            className="max-h-[min(380px,60vh)] overflow-y-auto p-2"
          >
            {results.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-fog-400">No matches.</p>
            )}
            {results.map((c, i) => {
              const showGroup = i === 0 || results[i - 1]?.group !== c.group;
              return (
                <div key={c.id} role="presentation">
                  {showGroup && (
                    <p
                      role="presentation"
                      className="px-3 pt-2.5 pb-1 font-mono text-[11px] tracking-wide text-fog-400"
                    >
                      {c.group}
                    </p>
                  )}
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard users pick options with the arrow keys and Enter in the search box (aria-activedescendant) */}
                  <div
                    id={`cmd-${c.id}`}
                    role="option"
                    tabIndex={-1}
                    aria-selected={i === active}
                    onMouseMove={() => setActive(i)}
                    onClick={() => void run(c)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm",
                      i === active ? "bg-accent/15 text-white" : "text-fog-200",
                    )}
                  >
                    <span className="shrink-0">{c.label}</span>
                    <span
                      className={cn(
                        "min-w-0 truncate text-xs",
                        done === c.id ? "text-[#4ade80]" : "text-fog-400",
                      )}
                    >
                      {done === c.id ? "Copied ✓" : c.hint}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="flex gap-4 border-t border-line px-4 py-2.5 font-mono text-[11px] text-fog-400 pointer-coarse:hidden">
            <span>↑↓ move</span>
            <span>↵ open</span>
            <span>esc close</span>
          </p>
        </div>
      )}
    </dialog>
  );
}
