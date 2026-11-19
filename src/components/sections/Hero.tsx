import { m, useReducedMotion } from "motion/react";
import { HeroEditor } from "~/components/hero/HeroEditor";
import { site } from "~/content/site";

export function Hero() {
  const reduce = useReducedMotion();
  const words = site.hero.headline.split(" ");
  return (
    <section
      aria-labelledby="hero-title"
      className="grid items-center gap-16 pt-20 pb-24 md:pt-28 lg:grid-cols-[1.15fr_1fr]"
    >
      <div>
        <p className="font-mono text-sm text-accent">{site.hero.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl xl:text-7xl"
        >
          {words.map((word, i) => [
            i > 0 ? " " : null,
            <m.span
              // biome-ignore lint/suspicious/noArrayIndexKey: static headline, order never changes
              key={i}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </m.span>,
          ])}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-fog-300">{site.hero.sub}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-full bg-accent px-6 py-3 font-medium text-ink-950 transition-transform hover:-translate-y-0.5"
          >
            See my work
          </a>
          <a
            href="/resume.pdf"
            className="rounded-full border border-ink-700 px-6 py-3 font-medium transition-colors hover:border-fog-300"
          >
            Download résumé
          </a>
        </div>
      </div>
      <HeroEditor />
    </section>
  );
}
