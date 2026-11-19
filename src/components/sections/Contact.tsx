import { CopyEmail } from "~/components/ui/CopyEmail";
import { site } from "~/content/site";

const OUTLINE =
  "rounded-[10px] border border-[#334155] px-5.5 py-3.5 font-semibold text-fog-100 transition-colors hover:border-fog-400";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-grid mt-12 scroll-mt-16 border-t border-line"
    >
      <div className="container-page flex flex-col items-center gap-5 py-24 text-center">
        <p className="font-mono text-sm text-accent">05 / Contact</p>
        <h2
          id="contact-title"
          className="max-w-[720px] font-display text-[clamp(32px,4vw,48px)] leading-tight font-bold text-white"
        >
          {site.contact.heading}
        </h2>
        <p className="max-w-[560px] text-lg leading-relaxed text-fog-200">{site.contact.line}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-[10px] bg-accent px-6 py-3.5 font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgb(125_211_252/0.25)]"
          >
            Email me
          </a>
          <a href={site.links.linkedin} className={OUTLINE}>
            LinkedIn
          </a>
          <a href={site.links.github} className={OUTLINE}>
            GitHub
          </a>
        </div>
        <CopyEmail email={site.email} />
      </div>
    </section>
  );
}
