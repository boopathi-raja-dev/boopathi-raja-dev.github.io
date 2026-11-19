import type { CSSProperties } from "react";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { cn } from "~/lib/cn";

export type VisualKind = "calendar" | "hierarchy" | "bars";

type Props = {
  kind: VisualKind;
  /** Animate now. */
  play: boolean;
  /** Keep looping while true (e.g. while hovered); otherwise play one cycle. */
  loop?: boolean;
  /** Card style with a bottom border; false for the bare version on case-study pages. */
  framed?: boolean;
};

const CELL = "#1e3a5f";
const ACCENT = "#7dd3fc";

/** Small animated illustration for a case study. Pure CSS animation; decorative only. */
export function CaseVisual({ kind, play, loop = false, framed = true }: Props) {
  const reduce = useReducedMotion();
  const anim: Anim = { run: play && !reduce, count: loop ? "infinite" : "1", still: reduce };
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-[180px] items-center justify-center bg-[#13213a]",
        framed ? "border-b border-line" : "rounded-lg",
        kind === "bars" && "items-end pb-9",
      )}
    >
      {kind === "calendar" && <Calendar {...anim} />}
      {kind === "hierarchy" && <Hierarchy {...anim} />}
      {kind === "bars" && <Bars {...anim} />}
    </div>
  );
}

type Anim = { run: boolean; count: string; still: boolean };

/** CSS `animation` shorthand, only while playing. */
const animation = (run: boolean, value: string): CSSProperties | undefined =>
  run ? { animation: value } : undefined;

// A fixed, scattered order so slots look like they're being booked one by one.
const CALENDAR_DELAYS = [3, 7, 11, 0, 5, 9, 13, 2, 14, 1, 6, 10, 4, 8, 12];
const BOOKED_WHEN_STILL = new Set([1, 4, 8, 11, 13]);

/** Booking calendar: slots light up in turn. */
function Calendar({ run, count, still }: Anim) {
  return (
    <div className="grid grid-cols-[repeat(5,28px)] gap-1.5">
      {CALENDAR_DELAYS.map((d, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative grid
          key={i}
          className="h-[22px] rounded"
          style={{
            backgroundColor: still && BOOKED_WHEN_STILL.has(i) ? ACCENT : CELL,
            ...animation(run, `cell-pulse 2.2s ease-in-out ${d * 0.12}s ${count} both`),
          }}
        />
      ))}
    </div>
  );
}

const LEVELS = ["Apartment", "Floor", "Room", "Bed"];

/** Housing hierarchy: each level glows in turn, down to a single bed. */
function Hierarchy({ run, count, still }: Anim) {
  return (
    <div className="flex flex-col items-center gap-2.5 font-mono text-xs">
      {LEVELS.map((label, i) => (
        <span
          key={label}
          className="rounded-md border px-3 py-1.5"
          style={{
            borderColor: still && i === 3 ? ACCENT : "#334155",
            color: still && i === 3 ? ACCENT : "#94a3b8",
            ...animation(run, `node-glow 2s ease-in-out ${i * 0.5}s ${count} both`),
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/** Lighthouse before/after: the "after" bar grows by 20 points. */
function Bars({ run, count, still }: Anim) {
  return (
    <div className="flex items-end gap-3.5">
      <div className="flex flex-col items-center gap-1.5">
        <span className="h-[54px] w-11 rounded-t-md bg-[#475569]" />
        <span className="text-xs text-fog-400">Before</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span
          className="w-11 rounded-t-md bg-accent"
          style={{
            height: still || !run ? 92 : 54,
            ...animation(run, `bar-grow 3.2s ease-in-out ${count} both`),
          }}
        />
        <span className="text-xs text-fog-100">+20</span>
      </div>
    </div>
  );
}
