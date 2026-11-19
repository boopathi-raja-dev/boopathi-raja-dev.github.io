import { Link } from "@tanstack/react-router";
import { allCaseStudies } from "content-collections";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "~/components/ui/Reveal";
import { Section } from "~/components/ui/Section";

export function WorkCards() {
  const studies = [...allCaseStudies].sort((a, b) => a.order - b.order);
  return (
    <Section id="work" eyebrow="01 / Selected work" title="Products I've helped ship">
      <ul className="grid gap-6 md:grid-cols-3">
        {studies.map((study, i) => (
          <li key={study.slug}>
            <Reveal delay={i * 0.08}>
              <Link
                to="/work/$slug"
                params={{ slug: study.slug }}
                className="group flex h-full flex-col rounded-2xl border border-ink-800 bg-ink-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <p className="font-mono text-xs text-accent">{study.category}</p>
                <h3 className="mt-3 flex items-start justify-between gap-2 font-display text-xl font-semibold">
                  {study.title}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-fog-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </h3>
                <p className="mt-3 flex-1 text-sm text-fog-300">{study.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
                  {study.tags.map((t) => (
                    <li key={t} className="rounded-full bg-ink-800 px-3 py-1 text-xs text-fog-300">
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
