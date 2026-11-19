import { Link } from "@tanstack/react-router";
import { allCaseStudies } from "content-collections";
import { useEffect, useRef, useState } from "react";
import { Section } from "~/components/ui/Section";
import { CaseVisual } from "~/components/work/CaseVisual";
import { useInView } from "~/hooks/useInView";
import { stagger } from "~/lib/stagger";

type Study = (typeof allCaseStudies)[number];

export const studiesInOrder = () => [...allCaseStudies].sort((a, b) => a.order - b.order);

export function WorkCards() {
  return (
    <Section id="work" eyebrow="01 / Selected work" title="Products I helped ship" first>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {studiesInOrder().map((study, i) => (
          <li key={study.slug} className="reveal flex" style={stagger(i)}>
            <WorkCard study={study} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function WorkCard({ study }: { study: Study }) {
  const ref = useRef<HTMLAnchorElement>(null);
  // Plays one cycle when the card first scrolls into view, then loops only while hovered/focused,
  // so three animations never compete with reading.
  const inView = useInView(ref, 0.5);
  const [intro, setIntro] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setIntro(true);
    const t = setTimeout(() => setIntro(false), 3500);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <Link
      ref={ref}
      to="/work/$slug"
      params={{ slug: study.slug }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-900 text-fog-100 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2e4a70] hover:shadow-[0_18px_40px_rgb(0_0_0/0.35)]"
    >
      <CaseVisual kind={study.visual} play={hover || intro} loop={hover} />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-[13px] text-fog-400">
          {study.label} · {study.durationShort}
        </p>
        <h3 className="font-display text-[22px] leading-snug font-semibold text-white">
          {study.title}
        </h3>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Tech used">
          {study.cardTags.map((t) => (
            <li key={t} className="rounded-full bg-[#13213a] px-2.5 py-1 text-xs text-fog-200">
              {t}
            </li>
          ))}
        </ul>
        <span className="text-sm font-semibold text-accent">
          Read case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
