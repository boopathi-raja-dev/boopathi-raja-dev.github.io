import { AnimatePresence, m, useInView } from "motion/react";
import { useRef } from "react";
import { site } from "~/content/site";
import { useTypewriter } from "~/hooks/useTypewriter";
import { cn } from "~/lib/cn";
import { highlight, type TokenKind } from "./highlight";

const CODE = `const Engineer = () => (
  <Profile
    name="${site.name}"
    stack={["React", "TypeScript", "AWS"]}
    builds="frontends people enjoy"
    location="Chennai"
  />
);`;

const TOKEN_CLASS: Record<TokenKind, string> = {
  keyword: "text-[#c792ea]",
  string: "text-[#c3e88d]",
  tag: "text-accent",
  component: "text-[#ffcb6b]",
  attr: "text-[#f78c6c]",
  punct: "text-fog-500",
  plain: "text-fog-100",
};

const STACK = ["React", "TypeScript", "AWS"];

export function HeroEditor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { output, done } = useTypewriter(CODE, { enabled: inView });
  const lineCount = CODE.split("\n").length;

  return (
    <figure
      ref={ref}
      aria-label={`Code sample: a React component describing ${site.name}, a frontend engineer in Chennai working with React, TypeScript and AWS.`}
      className="relative mb-16 lg:mb-0"
    >
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-900/90 shadow-2xl shadow-black/40 backdrop-blur"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-ink-800 px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-fog-500">Engineer.tsx</span>
        </div>

        <div className="flex px-4 py-5 font-mono text-[12px] leading-6 sm:text-sm">
          <ol className="mr-4 select-none text-right text-fog-500/50">
            {Array.from({ length: lineCount }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: line numbers are static
              <li key={i}>{i + 1}</li>
            ))}
          </ol>

          {/* Two layers in one grid cell: the invisible full code reserves space (no layout shift),
              the typed code draws on top of it. */}
          <pre className="grid flex-1 overflow-x-auto">
            <code className="invisible col-start-1 row-start-1 whitespace-pre">{CODE}</code>
            <code className="col-start-1 row-start-1 whitespace-pre">
              {highlight(output).map((t, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: tokens are re-derived from text each render
                <span key={i} className={TOKEN_CLASS[t.kind]}>
                  {t.value}
                </span>
              ))}
              <span
                className={cn(
                  "ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent",
                  done ? "animate-pulse" : "",
                )}
              />
            </code>
          </pre>
        </div>
      </div>

      {/* "Rendered" preview pops in once typing finishes */}
      <AnimatePresence>
        {done ? (
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute -right-2 -bottom-20 w-60 rounded-xl border border-accent/30 bg-ink-800/95 p-4 shadow-xl shadow-black/40 backdrop-blur"
          >
            <p className="font-mono text-xs text-[#28c840]">✓ Rendered</p>
            <p className="mt-2 font-display text-lg font-semibold">{site.name}</p>
            <p className="text-sm text-fog-300">Frontend Engineer · Chennai</p>
            <div className="mt-3 flex gap-1.5">
              {STACK.map((s) => (
                <span key={s} className="rounded bg-ink-950 px-2 py-0.5 text-xs text-accent">
                  {s}
                </span>
              ))}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </figure>
  );
}
