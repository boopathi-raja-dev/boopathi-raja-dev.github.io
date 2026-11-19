import { Section } from "~/components/ui/Section";
import { site } from "~/content/site";

export function Contact() {
  return (
    <Section id="contact" eyebrow="06 / Contact" title="Let's build something">
      <p className="max-w-xl text-lg text-fog-300">
        Open to conversations about frontend roles. The fastest way to reach me is email.
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-8 inline-block font-display text-2xl text-accent underline-offset-8 hover:underline md:text-4xl"
      >
        {site.email}
      </a>
    </Section>
  );
}
