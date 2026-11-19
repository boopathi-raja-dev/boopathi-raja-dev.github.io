import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("container-page scroll-mt-24 py-24", className)}
    >
      <p className="font-mono text-sm text-accent">{eyebrow}</p>
      <h2
        id={`${id}-title`}
        className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
