import { Code2 } from "lucide-react";
import { Reveal } from "~/components/ui/Reveal";
import { Section } from "~/components/ui/Section";
import { site } from "~/content/site";

export function Projects() {
  return (
    <Section id="projects" eyebrow="02 / Side projects" title="Things I build to learn">
      <ul className="grid gap-4 md:grid-cols-2">
        {site.projects.map((p, i) => (
          <li key={p.repo}>
            <Reveal delay={i * 0.05}>
              <a
                href={p.repo}
                className="group block rounded-xl border border-ink-800 p-5 transition-colors hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <Code2
                    aria-hidden="true"
                    className="size-4 text-fog-500 group-hover:text-accent"
                  />
                </div>
                <p className="mt-2 text-sm text-fog-300">{p.blurb}</p>
                <p className="mt-4 font-mono text-xs text-fog-500">{p.stack.join(" · ")}</p>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
