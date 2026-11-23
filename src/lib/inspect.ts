import { useSyncExternalStore } from "react";
import { site } from "~/content/site";

/**
 * Inspect mode: a tiny shared store (used by the Nav toggle and the command menu),
 * plus the map from each `data-inspect` component name to its source file, so a
 * click in Inspect mode opens the real code on GitHub.
 */

const REPO = `${site.links.github}/boopathi-raja-dev.github.io/blob/main/`;

/** Component name (as used in `data-inspect`) → file that defines it. */
export const SOURCES: Record<string, string> = {
  Nav: "src/components/layout/Nav.tsx",
  Footer: "src/components/layout/Footer.tsx",
  Hero: "src/components/sections/Hero.tsx",
  HeroEditor: "src/components/hero/HeroEditor.tsx",
  ProofStrip: "src/components/sections/ProofStrip.tsx",
  CountUp: "src/components/ui/CountUp.tsx",
  MessyToObvious: "src/components/sections/MessyToObvious.tsx",
  WorkCard: "src/components/sections/WorkCards.tsx",
  AlsoShipped: "src/components/sections/WorkCards.tsx",
  Projects: "src/components/sections/Projects.tsx",
  Skills: "src/components/sections/Skills.tsx",
  ExperienceAbout: "src/components/sections/ExperienceAbout.tsx",
  CopyEmail: "src/components/ui/CopyEmail.tsx",
  Scheduler: "src/components/work/Scheduler.tsx",
  CaseVisual: "src/components/work/CaseVisual.tsx",
  StubFirstDemo: "src/components/work/StubFirstDemo.tsx",
};

export const sourceUrl = (name: string) => {
  const path = SOURCES[name];
  return path ? REPO + path : undefined;
};

let on = false;
const listeners = new Set<() => void>();

/** Phones and tablets: no hover, so Inspect works by tapping. */
export const isTouch = () => window.matchMedia("(hover: none)").matches;

let tapped: HTMLElement | null = null;
const selectTapped = (el: HTMLElement | null) => {
  tapped?.classList.remove("inspect-hit");
  tapped = el;
  tapped?.classList.add("inspect-hit");
};

export function setInspect(next: boolean) {
  if (next === on) return;
  on = next;
  document.documentElement.classList.toggle("inspect-on", on);
  if (!on) selectTapped(null);
  for (const l of listeners) l();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Whether Inspect mode is on. Always false during prerender. */
export function useInspect() {
  return useSyncExternalStore(
    subscribe,
    () => on,
    () => false,
  );
}

/**
 * While Inspect mode is on, a click on any labelled component opens its source on
 * GitHub instead of doing its usual action. On touch screens the first tap shows the
 * label (there is no hover) and a second tap opens the source. Controls marked
 * `data-inspect-ignore` (the toggles, the command menu) keep working normally.
 */
export function onInspectClick(e: MouseEvent) {
  if (!on || e.button !== 0) return;
  const target = e.target as Element | null;
  if (!target || target.closest("[data-inspect-ignore]")) return;
  const el = target.closest<HTMLElement>("[data-inspect]");
  const url = el?.dataset.inspect ? sourceUrl(el.dataset.inspect) : undefined;
  if (!url || !el) return;
  e.preventDefault();
  e.stopPropagation();
  if (isTouch() && tapped !== el) {
    selectTapped(el);
    return;
  }
  window.open(url, "_blank", "noopener");
}
