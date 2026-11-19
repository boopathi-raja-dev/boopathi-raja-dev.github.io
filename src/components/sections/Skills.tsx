import { Section } from "~/components/ui/Section";
import { site } from "~/content/site";
import { stagger } from "~/lib/stagger";

export function Skills() {
  return (
    <Section id="skills" eyebrow="03 / Skills" title="What I work with">
      <dl className="grid border-t border-line md:grid-cols-2 md:gap-x-6">
        {site.skills.map((s, i) => (
          <div
            key={s.group}
            className="reveal flex gap-5 border-b border-line py-5 pr-6"
            style={stagger(i % 2)}
          >
            <dt className="w-[120px] shrink-0 font-semibold text-white">{s.group}</dt>
            <dd className="leading-relaxed text-fog-200">{s.items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
