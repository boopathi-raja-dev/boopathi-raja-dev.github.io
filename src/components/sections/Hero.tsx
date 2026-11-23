import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { HeroEditor } from "~/components/hero/HeroEditor";
import { SocialLinks } from "~/components/ui/SocialLinks";
import { site } from "~/content/site";
import { cn } from "~/lib/cn";

const ACCENT_WORD = "frontends";

/** Staggers the CSS `.rise` entrance animation. */
const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  const words = site.hero.headline.split(" ");

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-grid relative overflow-hidden border-b border-line"
    >
      <div className="container-page grid items-center gap-12 pt-24 pb-22 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="flex min-w-0 flex-col gap-6">
          <p className="rise text-sm font-semibold tracking-[3px] text-accent uppercase">
            {site.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(40px,5.2vw,64px)] leading-[1.06] font-bold tracking-[-1px] text-white"
          >
            {words.map((word, i) => [
              i > 0 ? " " : null,
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: static headline, order never changes
                key={i}
                style={delay(0.1 + 0.07 * i)}
                className={cn("rise inline-block", word === ACCENT_WORD && "text-accent")}
              >
                {word}
              </span>,
            ])}
          </h1>

          <p
            style={delay(0.75)}
            className="rise max-w-[560px] text-[19px] leading-relaxed text-fog-200"
          >
            {site.hero.sub}
          </p>

          <p
            style={delay(0.82)}
            className="rise inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-ink-900/70 px-3.5 py-1.5 text-sm text-fog-200"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-[#4ade80]" />
            {site.hero.availability}
          </p>

          <div style={delay(0.9)} className="rise mt-2 flex flex-wrap gap-3">
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
          </div>

          <div style={delay(1)} className="rise mt-1">
            <SocialLinks />
          </div>
        </div>

        <div style={delay(0.4)} className="rise min-w-0">
          <HeroEditor />
        </div>
      </div>
    </section>
  );
}
