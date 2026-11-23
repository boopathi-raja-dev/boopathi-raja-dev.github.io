import { useEffect, useRef, useState } from "react";
import { CountUp } from "~/components/ui/CountUp";
import { site } from "~/content/site";
import { useInView } from "~/hooks/useInView";
import { useReducedMotion } from "~/hooks/useReducedMotion";
import { cn } from "~/lib/cn";

const NUMBER = "font-display text-4xl font-bold";
const STEP_MS = 320;

const CHECKS = [
  ...site.proof.map((p) => ({ ...p, accent: false })),
  { value: null, label: site.certifications[0], check: "aws.certified", accent: true },
];

/**
 * Highlights styled as a CI run: each stat is a "check" that passes in turn once the
 * strip scrolls into view, like this site's own pipeline. Only colour changes (never
 * opacity), so every state keeps readable contrast. The run lines are decorative;
 * screen readers get the plain numbers and labels.
 */
export function ProofStrip() {
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, 0.5);
  const reduce = useReducedMotion();
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setPassed(CHECKS.length);
      return;
    }
    const timer = setInterval(() => {
      setPassed((n) => {
        if (n + 1 >= CHECKS.length) clearInterval(timer);
        return Math.min(n + 1, CHECKS.length);
      });
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [inView, reduce]);

  const done = passed === CHECKS.length;

  return (
    <section
      aria-label="Highlights"
      className="border-b border-line bg-ink-900"
      data-inspect="ProofStrip"
    >
      <div className="container-page flex flex-col gap-5 py-9">
        <p
          aria-hidden="true"
          className="flex flex-wrap items-center justify-between gap-2 font-mono text-[13px] text-fog-400"
        >
          <span>
            <span className="text-accent">$</span> pnpm verify --profile
          </span>
          <span className={cn("transition-colors duration-300", done && "text-[#4ade80]")}>
            {done ? `✓ ${CHECKS.length} checks passed` : `running ${CHECKS.length} checks…`}
          </span>
        </p>
        <dl
          ref={ref}
          className="grid grid-cols-2 gap-6 sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))]"
        >
          {CHECKS.map((c, i) => {
            const ok = i < passed;
            return (
              <div key={c.check} className="flex flex-col gap-1.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "order-first font-mono text-xs transition-colors duration-300",
                    ok ? "text-[#4ade80]" : "text-fog-400",
                  )}
                >
                  {ok ? "✓" : "○"} {c.check}
                </span>
                <dt className="order-2 text-sm leading-normal text-fog-400">{c.label}</dt>
                {c.value === null ? (
                  <dd className={`${NUMBER} order-1 text-accent`}>AWS</dd>
                ) : (
                  <dd
                    className={`${NUMBER} order-1 text-white`}
                    data-inspect="CountUp"
                    data-props={`to={${c.value}}${"prefix" in c && c.prefix ? ` prefix="${c.prefix}"` : ""}${"suffix" in c && c.suffix ? ` suffix="${c.suffix}"` : ""}`}
                  >
                    <CountUp
                      to={c.value}
                      prefix={"prefix" in c ? c.prefix : undefined}
                      suffix={"suffix" in c ? c.suffix : undefined}
                    />
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
