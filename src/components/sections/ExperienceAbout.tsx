import { SectionHeader } from "~/components/ui/Section";
import { site } from "~/content/site";

export function ExperienceAbout() {
  return (
    <section
      data-inspect="ExperienceAbout"
      id="experience"
      aria-labelledby="experience-title"
      className="container-page flex scroll-mt-20 flex-wrap gap-12 py-12"
    >
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
        <SectionHeader id="experience" eyebrow="04 / Experience" title="Where I've worked" />
        <ol className="border-l-2 border-line pl-6">
          {site.experience.map((e) => (
            <li key={e.title} className="reveal flex flex-col gap-1.5 pb-7 last:pb-0">
              <p className="font-mono text-[13px] text-fog-400">{e.period}</p>
              <h3 className="text-lg font-semibold text-white">
                {e.title} · {e.org}
              </h3>
              <p className="leading-relaxed text-fog-200">{e.line}</p>
            </li>
          ))}
        </ol>
        <ul className="reveal flex flex-wrap gap-2.5" aria-label="Certifications">
          {site.certifications.map((c) => (
            <li
              key={c}
              className="rounded-full border border-accent/30 px-3.5 py-1.5 text-sm text-accent"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <aside
        id="about"
        aria-label="About me"
        className="reveal flex min-w-0 flex-[1_1_360px] scroll-mt-20 flex-col gap-5 self-start rounded-2xl border border-line bg-ink-900 p-8"
      >
        <div className="flex items-center gap-3.5">
          <img
            src="/avatar.webp"
            alt={site.name}
            width={64}
            height={64}
            loading="lazy"
            className="size-16 rounded-full border-2 border-ink-700 object-cover"
          />
          <p className="font-mono text-sm text-accent">About</p>
        </div>
        {site.about.map((para) => (
          <p key={para} className="leading-[1.7] text-fog-200">
            {para}
          </p>
        ))}
      </aside>
    </section>
  );
}
