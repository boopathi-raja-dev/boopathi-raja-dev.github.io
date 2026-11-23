import { useState } from "react";
import { cn } from "~/lib/cn";

type Mode = "without" | "with";
type Span = [start: number, end: number] | null;
type Tone = "build" | "shared" | "rework" | "wait";

/** One bar in a lane, with its span (in sprint days) for each mode. */
type Bar = { id: string; label: Record<Mode, string>; span: Record<Mode, Span>; tone: Tone };

const DAYS = 10;
const DAY_LABELS = Array.from({ length: DAYS }, (_, d) => `D${d + 1}`);

const LANES: { name: string; bars: Bar[] }[] = [
  {
    name: "Frontend",
    bars: [
      {
        id: "fe-agree",
        label: { without: "", with: "Agree stub" },
        span: { without: null, with: [0, 1] },
        tone: "shared",
      },
      {
        id: "fe-build",
        label: { without: "UI on a draft stub", with: "UI on the agreed stub" },
        span: { without: [0, 4.5], with: [1, 6] },
        tone: "build",
      },
      {
        id: "fe-wait",
        label: { without: "Wait", with: "" },
        span: { without: [4.5, 6], with: null },
        tone: "wait",
      },
      {
        id: "fe-rework",
        label: { without: "Rework UI", with: "" },
        span: { without: [6, 9], with: null },
        tone: "rework",
      },
      {
        id: "fe-int",
        label: { without: "Integrate", with: "Integrate" },
        span: { without: [9, 10], with: [6, 7] },
        tone: "shared",
      },
    ],
  },
  {
    name: "Backend",
    bars: [
      {
        id: "be-agree",
        label: { without: "", with: "Agree stub" },
        span: { without: null, with: [0, 1] },
        tone: "shared",
      },
      {
        id: "be-build",
        label: { without: "Build API", with: "Build API" },
        span: { without: [0, 6], with: [1, 6] },
        tone: "build",
      },
      {
        id: "be-rework",
        label: { without: "Fix mismatches", with: "" },
        span: { without: [6.5, 9], with: null },
        tone: "rework",
      },
      {
        id: "be-int",
        label: { without: "Integrate", with: "Integrate" },
        span: { without: [9, 10], with: [6, 7] },
        tone: "shared",
      },
    ],
  },
];

const TONE: Record<Tone, string> = {
  build: "border-[#2e4a70] bg-ink-800 text-fog-200",
  shared: "border-accent/50 bg-accent/15 text-accent",
  rework: "border-[#f87171]/50 bg-[#3b1820] text-[#fca5a5]",
  wait: "border-dashed border-ink-700 bg-transparent text-fog-400",
};

const FINISH: Record<Mode, number> = { without: 10, with: 7 };

const SUMMARY: Record<Mode, string> = {
  without:
    "Without stub-first: frontend builds on a draft stub. When the real API lands on day 6 and doesn't match, both sides redo work, and integration slips to day 10.",
  with: "With stub-first: both sides agree the stub on day 1, build in parallel against it, and integrate on day 7 with no rework.",
};

const pct = (day: number) => `${(day / DAYS) * 100}%`;

/**
 * Interactive illustration for the ERP case study: the same sprint with and without
 * the stub-first workflow. Bars move with CSS transitions (instant under reduced
 * motion). Illustrative only: the day counts are not measured data.
 */
export function StubFirstDemo() {
  const [mode, setMode] = useState<Mode>("without");

  return (
    <div className="flex flex-col gap-5" data-inspect="StubFirstDemo" data-props={`mode="${mode}"`}>
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">Workflow</legend>
        {(["without", "with"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              mode === m
                ? "border-accent bg-accent text-ink-950"
                : "border-ink-700 text-fog-200 hover:border-accent hover:text-accent",
            )}
          >
            {m === "without" ? "Without stub-first" : "With stub-first"}
          </button>
        ))}
      </fieldset>

      {/* Focusable so keyboard users can scroll it sideways on small screens. */}
      <section
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be keyboard-reachable
        tabIndex={0}
        aria-label="Sprint timeline illustration"
        className="overflow-x-auto rounded-lg"
      >
        <div aria-hidden="true" className="relative min-w-[620px] pb-1">
          {/* Day axis */}
          <div className="ml-[92px] flex border-b border-line pb-1.5 font-mono text-[11px] text-fog-400">
            {DAY_LABELS.map((day) => (
              <span key={day} className="flex-1">
                {day}
              </span>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-3">
            {LANES.map((lane) => (
              <div key={lane.name} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-[13px] font-semibold text-fog-200">
                  {lane.name}
                </span>
                <div className="relative h-10 flex-1">
                  {lane.bars.map((bar) => {
                    const span = bar.span[mode];
                    const from = bar.span.with ?? bar.span.without ?? [0, 0];
                    const [start, end] = span ?? [from[0], from[0]];
                    return (
                      <span
                        key={bar.id}
                        className={cn(
                          "absolute top-0 flex h-full items-center overflow-hidden rounded-md border px-2 text-xs font-medium whitespace-nowrap transition-[left,width,opacity] duration-500 ease-out",
                          TONE[bar.tone],
                          !span && "opacity-0",
                        )}
                        style={{ left: pct(start), width: `calc(${pct(end - start)} - 3px)` }}
                      >
                        {bar.label[mode]}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Day 6: the real API lands (only matters without stub-first). */}
          <span
            className={cn(
              "absolute top-6 bottom-0 border-l border-dashed border-[#f87171] transition-opacity duration-500",
              mode === "with" && "opacity-0",
            )}
            style={{ left: `calc(92px + (100% - 92px) * ${6 / DAYS})` }}
          />
          {/* Finish line */}
          <span
            className="absolute top-6 bottom-0 border-l-2 border-[#4ade80] transition-[left] duration-500 ease-out"
            style={{
              left: `min(calc(92px + (100% - 92px) * ${FINISH[mode] / DAYS}), calc(100% - 2px))`,
            }}
          />
        </div>
      </section>

      <p className="-mt-2 text-xs text-fog-400 sm:hidden">
        Swipe the timeline to see the whole sprint.
      </p>

      <p aria-live="polite" className="max-w-[760px] text-[15px] leading-relaxed text-fog-200">
        {SUMMARY[mode]}{" "}
        <span className="text-fog-400">Illustrative timeline, not measured data.</span>
      </p>
    </div>
  );
}
