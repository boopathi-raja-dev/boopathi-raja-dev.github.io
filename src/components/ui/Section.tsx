import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

type HeaderProps = { id: string; eyebrow: string; title: string };

/** Mono eyebrow ("01 / Selected work") above a section title, as in the design. */
export function SectionHeader({ id, eyebrow, title }: HeaderProps) {
  return (
    <div className="flex flex-col gap-2.5">
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

type Props = HeaderProps & { children: ReactNode; className?: string };

export function Section({ id, eyebrow, title, children, className }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("container-page flex scroll-mt-20 flex-col gap-8 py-12", className)}
    >
      <SectionHeader id={id} eyebrow={eyebrow} title={title} />
      {children}
    </section>
  );
}
