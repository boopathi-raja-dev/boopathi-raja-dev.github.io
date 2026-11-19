import { m, useReducedMotion } from "motion/react";
import { cn } from "~/lib/cn";

export type VisualKind = "calendar" | "hierarchy" | "bars";

type Props = {
  kind: VisualKind;
  /** Animate now. */
  play: boolean;
  /** Keep looping while true (e.g. while hovered); otherwise play one cycle. */
  loop?: boolean;
  className?: string;
};

const CELL = "#1e3a5f";
const ACCENT = "#7dd3fc";

/** Small animated illustration for a case study. Purely decorative. */
export function CaseVisual({ kind, play, loop = false, className }: Props) {
  const reduce = useReducedMotion() ?? false;
  const run = play && !reduce;
  const repeat = loop ? Number.POSITIVE_INFINITY : 0;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-[180px] items-center justify-center border-b border-line bg-[#13213a]",
        kind === "bars" && "items-end pb-9",
        className,
      )}
    >
      {kind === "calendar" && <Calendar run={run} repeat={repeat} still={reduce} />}
      {kind === "hierarchy" && <Hierarchy run={run} repeat={repeat} still={reduce} />}
      {kind === "bars" && <Bars run={run} repeat={repeat} still={reduce} />}
    </div>
  );
}

type Anim = { run: boolean; repeat: number; still: boolean };

// A fixed, scattered order so slots look like they're being booked one by one.
const CALENDAR_DELAYS = [3, 7, 11, 0, 5, 9, 13, 2, 14, 1, 6, 10, 4, 8, 12];
const BOOKED_WHEN_STILL = new Set([1, 4, 8, 11, 13]);

/** Booking calendar: slots light up in turn. */
function Calendar({ run, repeat, still }: Anim) {
  return (
    <div className="grid grid-cols-[repeat(5,28px)] gap-1.5">
      {CALENDAR_DELAYS.map((d, i) => (
        <m.span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative grid
          key={i}
          className="h-[22px] rounded"
          style={{ backgroundColor: still && BOOKED_WHEN_STILL.has(i) ? ACCENT : CELL }}
          animate={run ? { backgroundColor: [CELL, ACCENT, ACCENT, CELL] } : undefined}
          transition={{
            duration: 1.6,
            times: [0, 0.3, 0.6, 1],
            delay: d * 0.12,
            repeat,
            repeatDelay: 0.6,
          }}
        />
      ))}
    </div>
  );
}

const LEVELS = ["Apartment", "Floor", "Room", "Bed"];

/** Housing hierarchy: each level glows in turn, down to a single bed. */
function Hierarchy({ run, repeat, still }: Anim) {
  return (
    <div className="flex flex-col items-center gap-2.5 font-mono text-xs">
      {LEVELS.map((label, i) => (
        <m.span
          key={label}
          className="rounded-md border px-3 py-1.5"
          style={{
            borderColor: still && i === 3 ? ACCENT : "#334155",
            color: still && i === 3 ? ACCENT : "#94a3b8",
          }}
          animate={
            run
              ? {
                  borderColor: ["#334155", ACCENT, "#334155"],
                  color: ["#94a3b8", ACCENT, "#94a3b8"],
                  boxShadow: [
                    "0 0 0 rgb(125 211 252 / 0)",
                    "0 0 18px rgb(125 211 252 / 0.35)",
                    "0 0 0 rgb(125 211 252 / 0)",
                  ],
                }
              : undefined
          }
          transition={{ duration: 1.2, delay: i * 0.5, repeat, repeatDelay: 0.8 }}
        >
          {label}
        </m.span>
      ))}
    </div>
  );
}

/** Lighthouse before/after: the "after" bar grows by 20 points. */
function Bars({ run, repeat, still }: Anim) {
  return (
    <div className="flex items-end gap-3.5">
      <div className="flex flex-col items-center gap-1.5">
        <span className="h-[54px] w-11 rounded-t-md bg-[#475569]" />
        <span className="text-xs text-fog-400">Before</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <m.span
          className="w-11 rounded-t-md bg-accent"
          style={{ height: still || !run ? 92 : 54 }}
          animate={run ? { height: [54, 92, 92, 54] } : undefined}
          transition={{ duration: 3.2, times: [0, 0.35, 0.85, 1], repeat, ease: "easeInOut" }}
        />
        <span className="text-xs text-fog-100">+20</span>
      </div>
    </div>
  );
}
