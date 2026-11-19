import { Section } from "~/components/ui/Section";
import { site } from "~/content/site";

export function Experience() {
  return (
    <Section id="experience" eyebrow="04 / Experience" title="Where I've worked">
      <ol className="space-y-10 border-l border-ink-700 pl-8">
        {site.experience.map((e) => (
          <li key={e.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[37px] size-2.5 rounded-full bg-accent"
            />
            <p className="font-mono text-xs text-fog-500">{e.period}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{e.title}</h3>
            <p className="text-fog-300">{e.company}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-fog-300">
              {e.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <ul className="mt-12 flex flex-wrap gap-3" aria-label="Certifications">
        {site.certifications.map((c) => (
          <li
            key={c}
            className="rounded-full border border-accent/30 px-4 py-1.5 text-sm text-accent"
          >
            {c}
          </li>
        ))}
      </ul>
    </Section>
  );
}
