import { Section } from "~/components/ui/Section";
import { site } from "~/content/site";

export function About() {
  return (
    <Section id="about" eyebrow="05 / About" title="A bit about me">
      <div className="max-w-2xl space-y-4 text-lg text-fog-300">
        {site.about.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
    </Section>
  );
}
