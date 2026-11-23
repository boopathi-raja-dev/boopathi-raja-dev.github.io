const STAFF = ["Stylist A", "Stylist B", "Therapist C", "Stylist D"];

type Slot = { text: string; tone: "booked" | "free" | "leave" | "walkin" };

const ROWS: { time: string; slots: Slot[] }[] = [
  {
    time: "10:00",
    slots: [
      { text: "Haircut + colour", tone: "booked" },
      { text: "Free", tone: "free" },
      { text: "Facial", tone: "booked" },
      { text: "On leave", tone: "leave" },
    ],
  },
  {
    time: "11:00",
    slots: [
      { text: "(same booking)", tone: "booked" },
      { text: "Walk-in · checked in", tone: "walkin" },
      { text: "Free", tone: "free" },
      { text: "On leave", tone: "leave" },
    ],
  },
];

const TONE: Record<Slot["tone"], string> = {
  booked: "border-accent/40 bg-accent/10 text-accent",
  free: "border-dashed border-ink-700 text-fog-400",
  leave:
    "border-ink-700 bg-[repeating-linear-gradient(45deg,#16253b,#16253b_6px,#13213a_6px,#13213a_12px)] text-fog-400",
  walkin: "border-[#34d399]/40 bg-[#34d399]/10 text-[#34d399]",
};

/** A rebuilt staff scheduler (not a client screenshot) for the salon case study. */
export function Scheduler() {
  return (
    // Focusable so keyboard users can scroll it sideways on small screens (WCAG 2.1.1).
    <section
      // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be keyboard-reachable
      tabIndex={0}
      aria-label="Staff scheduler illustration"
      data-inspect="Scheduler"
      className="overflow-x-auto rounded-lg"
    >
      <div className="grid min-w-[560px] grid-cols-[90px_repeat(4,minmax(0,1fr))] gap-2 text-[13px]">
        <span />
        {STAFF.map((s) => (
          <span key={s} className="font-semibold text-fog-200">
            {s}
          </span>
        ))}
        {ROWS.map((row) => [
          <span key={row.time} className="py-3 font-mono text-fog-400">
            {row.time}
          </span>,
          ...row.slots.map((slot, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed illustration grid
              key={`${row.time}-${i}`}
              className={`rounded-lg border px-3 py-3 ${TONE[slot.tone]}`}
            >
              {slot.text}
            </span>
          )),
        ])}
      </div>
    </section>
  );
}
