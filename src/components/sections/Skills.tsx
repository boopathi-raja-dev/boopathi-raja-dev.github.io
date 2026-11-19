import { Section } from "~/components/ui/Section";
import { site } from "~/content/site";

export function Skills() {
  return (
    <Section id="skills" eyebrow="03 / Toolbox" title="What I work with">
      <dl className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {site.skills.map((s) => (
          <div key={s.group}>
            <dt className="font-mono text-sm text-fog-500">{s.group}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span key={item} className="rounded-md border border-ink-700 px-2.5 py-1 text-sm">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
