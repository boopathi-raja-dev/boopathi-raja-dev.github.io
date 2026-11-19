import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { HeroEditor } from "~/components/hero/HeroEditor";
import { SocialLinks } from "~/components/ui/SocialLinks";
import { site } from "~/content/site";
import { cn } from "~/lib/cn";

const ACCENT_WORD = "frontends";
const EASE = [0.2, 0.7, 0.2, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const words = site.hero.headline.split(" ");

  // Fades and lifts an element in, after `delay` seconds.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-grid relative overflow-hidden border-b border-line"
    >
      <div className="container-page grid items-center gap-12 pt-24 pb-22 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="flex min-w-0 flex-col gap-6">
          <m.p {...rise(0)} className="text-sm font-semibold tracking-[3px] text-accent uppercase">
            {site.hero.eyebrow}
          </m.p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(40px,5.2vw,64px)] leading-[1.06] font-bold tracking-[-1px] text-white"
          >
            {words.map((word, i) => [
              i > 0 ? " " : null,
              <m.span
                // biome-ignore lint/suspicious/noArrayIndexKey: static headline, order never changes
                key={i}
                className={cn("inline-block", word === ACCENT_WORD && "text-accent")}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + 0.07 * i, ease: EASE }}
              >
                {word}
              </m.span>,
            ])}
          </h1>

          <m.p {...rise(0.75)} className="max-w-[560px] text-[19px] leading-relaxed text-fog-200">
            {site.hero.sub}
          </m.p>

          <m.div {...rise(0.9)} className="mt-2 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-6 py-3.5 font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgb(125_211_252/0.25)]"
            >
              View my work
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center rounded-[10px] border border-[#334155] px-5.5 py-3.5 font-semibold text-fog-100 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgb(125_211_252/0.25)]"
            >
              Resume
            </a>
          </m.div>

          <m.div {...rise(1)} className="mt-1">
            <SocialLinks />
          </m.div>
        </div>

        <m.div {...rise(0.4)} className="min-w-0">
          <HeroEditor />
        </m.div>
      </div>
    </section>
  );
}
