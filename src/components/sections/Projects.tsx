import { Section } from "~/components/ui/Section";
import { site } from "~/content/site";
import { cn } from "~/lib/cn";
import { stagger } from "~/lib/stagger";

export function Projects() {
  return (
    <Section id="projects" eyebrow="02 / Projects" title="Things I build on my own time">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {site.projects.map((p, i) => (
          <li key={p.href} className="reveal flex" style={stagger(i)}>
            <a
              href={p.href}
              className={cn(
                "group flex w-full flex-col gap-3 rounded-[14px] border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2e4a70]",
                p.dashed
                  ? "border-dashed border-[#334155] bg-transparent"
                  : "border-line bg-ink-900 hover:shadow-[0_18px_40px_rgb(0_0_0/0.35)]",
              )}
            >
              <h3 className="font-display text-[19px] font-semibold text-white">{p.name}</h3>
              <p className="text-[15px] leading-relaxed text-fog-200">{p.blurb}</p>
              <p className="font-mono text-xs text-fog-400">{p.stack}</p>
              <span className="mt-auto pt-1 text-sm font-semibold text-accent group-hover:text-[#bae6fd]">
                {p.linkLabel}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
