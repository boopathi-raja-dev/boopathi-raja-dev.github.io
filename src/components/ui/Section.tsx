import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

type HeaderProps = { id: string; eyebrow: string; title: string };

/** Mono eyebrow ("01 / Selected work") above a section title, as in the design. */
export function SectionHeader({ id, eyebrow, title }: HeaderProps) {
  return (
    <div className="reveal flex flex-col gap-2.5">
      <p className="font-mono text-sm text-accent">{eyebrow}</p>
      <h2
        id={`${id}-title`}
        className="font-display text-[32px] leading-tight font-bold text-white md:text-[40px]"
      >
        {title}
      </h2>
    </div>
  );
}

type Props = HeaderProps & {
  children: ReactNode;
  /** First section after the hero: extra space above. */
  first?: boolean;
};

export function Section({ id, eyebrow, title, children, first = false }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "container-page flex scroll-mt-20 flex-col gap-8",
        first ? "pt-24 pb-12" : "py-12",
      )}
    >
      <SectionHeader id={id} eyebrow={eyebrow} title={title} />
      {children}
    </section>
  );
}
