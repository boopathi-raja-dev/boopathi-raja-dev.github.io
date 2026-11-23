import type { CSSProperties } from "react";
import { Section } from "~/components/ui/Section";
import { cn } from "~/lib/cn";

/**
 * "Messy workflows in, obvious screens out": scattered UI pieces snap into a clean
 * dashboard as the section scrolls into view. Pure CSS scroll-driven animation
 * (see `.assemble` in app.css); without support, or with reduced motion, visitors
 * see the finished dashboard. The dashboard is an invented illustration.
 */

type Piece = {
  /** Final position, as % of the stage. */
  box: [left: number, top: number, width: number, height: number];
  /** Where it starts before scrolling: x/y offset (px) and rotation (deg). */
  from: [x: number, y: number, r: number];
  className?: string;
  children: React.ReactNode;
};

const stageStyle = (p: Piece) =>
  ({
    left: `${p.box[0]}%`,
    top: `${p.box[1]}%`,
    width: `${p.box[2]}%`,
    height: `${p.box[3]}%`,
    "--fx": `${p.from[0]}px`,
    "--fy": `${p.from[1]}px`,
    "--fr": `${p.from[2]}deg`,
  }) as CSSProperties;

const TILE = "rounded-lg border border-ink-700 bg-ink-800";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex h-full flex-col justify-center gap-0.5 px-3">
    <span className="truncate text-[11px] text-fog-400 sm:text-xs">{label}</span>
    <span className="font-display text-lg font-bold text-white sm:text-2xl">{value}</span>
  </div>
);

const ROWS = [
  { room: "Room 204", bed: "Bed B", status: "Confirmed", tone: "text-[#4ade80]" },
  { room: "Room 118", bed: "Bed A", status: "Waitlist", tone: "text-[#fbbf24]" },
  { room: "Room 310", bed: "Bed C", status: "Checked in", tone: "text-accent" },
];

/** Pieces of the finished dashboard. */
const PIECES: Piece[] = [
  {
    box: [0, 0, 18, 100],
    from: [-90, 40, -9],
    className: "rounded-l-xl rounded-r-none border-r border-ink-700 bg-ink-975",
    children: (
      <div className="flex flex-col gap-2.5 p-3">
        <span className="h-2 w-3/4 rounded-full bg-accent" />
        {[70, 55, 62, 48].map((w) => (
          <span key={w} className="h-2 rounded-full bg-ink-700" style={{ width: `${w}%` }} />
        ))}
      </div>
    ),
  },
  {
    box: [18, 0, 82, 14],
    from: [60, -30, 4],
    className: "rounded-none rounded-tr-xl border-b border-ink-700 bg-ink-900",
    children: (
      <div className="flex h-full items-center justify-between gap-3 px-4">
        <span className="truncate rounded-md border border-ink-700 px-2.5 py-1 text-[11px] text-fog-400 sm:text-xs">
          Search residents…
        </span>
        <span className="size-5 shrink-0 rounded-full bg-ink-700" />
      </div>
    ),
  },
  {
    box: [21, 19, 24, 22],
    from: [-140, -30, -14],
    className: TILE,
    children: <Stat label="Bookings" value="38" />,
  },
  {
    box: [47.5, 19, 24, 22],
    from: [30, 110, 10],
    className: TILE,
    children: <Stat label="Waitlist" value="12" />,
  },
  {
    box: [74, 19, 23, 22],
    from: [120, -20, 12],
    className: TILE,
    children: <Stat label="Invoices" value="5" />,
  },
  {
    box: [21, 45, 52, 50],
    from: [-60, 90, 7],
    className: TILE,
    children: (
      <div className="flex h-full flex-col justify-center gap-2 px-3 text-[11px] sm:text-xs">
        {ROWS.map((r) => (
          <div
            key={r.room}
            className="flex items-center justify-between gap-2 border-b border-ink-700 pb-1.5 last:border-0 last:pb-0"
          >
            <span className="truncate text-fog-200">
              {r.room}
              <span className="hidden sm:inline"> · {r.bed}</span>
            </span>
            <span className={cn("shrink-0 font-medium", r.tone)}>{r.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    box: [75.5, 45, 21.5, 31],
    from: [110, 60, -11],
    className: TILE,
    children: (
      <div className="grid h-full grid-cols-5 content-center gap-1 p-2.5">
        {Array.from({ length: 15 }, (_, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative grid
            key={i}
            className={cn(
              "aspect-square rounded-sm",
              [2, 6, 9, 13].includes(i) ? "bg-accent" : "bg-ink-700",
            )}
          />
        ))}
      </div>
    ),
  },
  {
    box: [75.5, 80, 21.5, 15],
    from: [40, 120, 15],
    className: "rounded-lg bg-accent",
    children: (
      <span className="flex h-full items-center justify-center text-xs font-semibold text-ink-950 sm:text-sm">
        Allocate
      </span>
    ),
  },
];

/** The mess: visible at first, gone once the screen is assembled. */
const MESS: Piece[] = [
  {
    box: [56, 4, 30, 24],
    from: [140, -40, 18],
    className: "rotate-[-5deg] rounded-sm bg-[#fde68a] p-2.5 shadow-lg",
    children: (
      <span className="font-mono text-[11px] leading-snug text-[#422006] sm:text-xs">
        waitlist?? call back Tue
      </span>
    ),
  },
  {
    box: [4, 66, 40, 13],
    from: [-150, 70, -12],
    className: "rotate-[4deg] rounded-md border border-[#166534] bg-[#052e16] px-2.5",
    children: (
      <span className="flex h-full items-center truncate font-mono text-[11px] text-[#86efac] sm:text-xs">
        bookings_FINAL_v7.xlsx
      </span>
    ),
  },
  {
    box: [38, 34, 36, 14],
    from: [90, 60, 9],
    className: "rotate-[-3deg] rounded-2xl rounded-bl-sm bg-[#e2e8f0] px-3",
    children: (
      <span className="flex h-full items-center truncate text-[11px] text-ink-950 sm:text-xs">
        Is room 4 free tomorrow?
      </span>
    ),
  },
];

export function MessyToObvious() {
  return (
    <Section
      id="approach"
      eyebrow="How I work"
      title="Messy workflows in. Obvious screens out."
      first
    >
      <div
        className="grid items-center gap-10 overflow-x-clip lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
        data-inspect="MessyToObvious"
      >
        <div className="reveal flex flex-col gap-4 text-lg leading-relaxed text-fog-200">
          <p>
            Most business software starts as spreadsheets, sticky notes and messages like “is room 4
            free tomorrow?”. My job is to turn that into one screen a person understands at a
            glance.
          </p>
          <p className="text-base text-fog-400">
            Scroll to watch it come together. The dashboard is an illustration, not client data.
          </p>
        </div>

        <div aria-hidden="true" className="assemble-stage relative h-[300px] sm:h-[360px]">
          <div className="assemble-frame absolute inset-0 rounded-xl border border-line bg-ink-900" />
          {PIECES.map((p, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed illustration
              key={i}
              className={cn("assemble absolute overflow-hidden", p.className)}
              style={stageStyle(p)}
            >
              {p.children}
            </div>
          ))}
          {MESS.map((p, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed illustration
              key={i}
              className={cn("dissolve absolute", p.className)}
              style={stageStyle(p)}
            >
              {p.children}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
