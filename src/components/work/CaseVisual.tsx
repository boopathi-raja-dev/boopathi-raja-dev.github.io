import { m, useReducedMotion } from "motion/react";
import { cn } from "~/lib/cn";

type Props = { slug: string; active: boolean };

/** A small animated illustration on top of each case-study card. Purely decorative. */
export function CaseVisual({ slug, active }: Props) {
  const reduce = useReducedMotion() ?? false;
  const play = active && !reduce;
  const Visual = VISUALS[slug] ?? CalendarVisual;
  return (
    <div
      aria-hidden="true"
      className="relative mb-6 h-32 overflow-hidden rounded-xl border border-ink-800 bg-ink-950/60"
    >
      <Visual play={play} />
    </div>
  );
}

/** Booking: calendar cells fill in as slots get booked. */
function CalendarVisual({ play }: { play: boolean }) {
  const booked = [1, 4, 6, 9, 11, 14, 17, 20, 22];
  return (
    <div className="grid h-full grid-cols-7 gap-1.5 p-4">
      {Array.from({ length: 21 }, (_, i) => {
        const order = booked.indexOf(i);
        return (
          <m.span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative grid
            key={i}
            className={cn("rounded-sm", order >= 0 ? "bg-accent" : "bg-ink-800")}
            initial={false}
            animate={order >= 0 ? { opacity: play ? [0.15, 1] : 0.55 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: play ? order * 0.12 : 0 }}
          />
        );
      })}
    </div>
  );
}

/** Housing: rooms light up as they get occupied, linked to a central hub. */
function RoomsVisual({ play }: { play: boolean }) {
  const rooms = [
    [45, 28],
    [100, 20],
    [155, 28],
    [45, 72],
    [100, 80],
    [155, 72],
  ] as const;
  return (
    <svg aria-hidden="true" viewBox="0 0 200 100" className="h-full w-full">
      {rooms.map(([cx, cy], i) => (
        <m.line
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative layout
          key={`l${i}`}
          x1={100}
          y1={50}
          x2={cx}
          y2={cy}
          stroke="#7dd3fc"
          strokeWidth={0.6}
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ pathLength: play ? [0, 1] : 1, opacity: play ? 0.6 : 0.25 }}
          transition={{ duration: 0.5, delay: play ? i * 0.1 : 0 }}
        />
      ))}
      <circle cx={100} cy={50} r={4} fill="#7dd3fc" />
      {rooms.map(([cx, cy], i) => (
        <m.rect
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative layout
          key={`r${i}`}
          x={cx - 13}
          y={cy - 7}
          width={26}
          height={14}
          rx={2}
          fill="#16253b"
          stroke="#7dd3fc"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ fill: play ? ["#16253b", "#1e4a63"] : "#16253b" }}
          transition={{ duration: 0.4, delay: play ? 0.3 + i * 0.1 : 0 }}
        />
      ))}
    </svg>
  );
}

/** Storefront: catalogue bars grow like a filtered product list loading in. */
function BarsVisual({ play }: { play: boolean }) {
  const heights = [45, 70, 55, 90, 65, 80, 50];
  return (
    <div className="flex h-full items-end gap-2 px-5 pt-5">
      {heights.map((h, i) => (
        <m.span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative layout
          key={i}
          className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-accent/30 to-accent"
          style={{ height: `${h}%` }}
          initial={false}
          animate={{ scaleY: play ? [0.1, 1] : 1, opacity: play ? 1 : 0.6 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: play ? i * 0.06 : 0 }}
        />
      ))}
    </div>
  );
}

const VISUALS: Record<string, (p: { play: boolean }) => React.JSX.Element> = {
  "salon-booking": CalendarVisual,
  "student-housing": RoomsVisual,
  "flooring-storefront": BarsVisual,
};
