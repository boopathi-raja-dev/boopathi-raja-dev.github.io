import { useRef } from "react";
import { site } from "~/content/site";
import { useIdle } from "~/hooks/useIdle";
import { useInView } from "~/hooks/useInView";
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
  punct: "text-fog-400",
  plain: "text-fog-100",
};

export function HeroEditor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  // Start typing only once the page has settled, so it never competes with loading.
  const idle = useIdle();
  const { output, done } = useTypewriter(CODE, { speed: 32, enabled: inView && idle });

  return (
    <figure
      ref={ref}
      aria-label={`Code sample: a React component describing ${site.name}, a frontend engineer in Chennai working with React, TypeScript and AWS.`}
      // "float" = gentle idle bob, as in the design (CSS, off for reduced motion).
      className="float overflow-hidden rounded-[14px] border border-[#24344f] bg-ink-975 shadow-[0_30px_60px_rgb(0_0_0/0.45)]"
    >
      <div aria-hidden="true">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-ink-900 px-4 py-3">
          <span className="size-[11px] rounded-full bg-[#f87171]" />
          <span className="size-[11px] rounded-full bg-[#fbbf24]" />
          <span className="size-[11px] rounded-full bg-[#34d399]" />
          <span className="ml-2.5 font-mono text-xs text-fog-400">Engineer.tsx</span>
        </div>

        {/* Two layers in one grid cell: the invisible full code reserves space (no layout shift),
            the typed code draws on top of it. */}
        <pre className="grid min-h-[230px] overflow-x-auto px-5 pt-5 pb-2 font-mono text-[13px] leading-[1.7] sm:text-sm">
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
                "ml-px inline-block h-[18px] w-[9px] translate-y-[3px] bg-accent",
                done && "animate-pulse",
              )}
            />
          </code>
        </pre>

        {/* "Rendered" result appears once typing finishes. Its space is reserved to avoid a jump. */}
        <div className="h-[82px] px-4 pb-4">
          {done ? (
            <div className="rise flex items-center gap-3 rounded-[10px] border border-[#24344f] bg-[#13213a] px-3.5 py-3">
              <img
                src="/avatar.webp"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold text-white">{site.name}</span>
                <span className="text-xs text-fog-400">React · TypeScript · AWS</span>
              </div>
              <span className="font-mono text-xs text-[#34d399]">✓ Rendered</span>
            </div>
          ) : null}
        </div>
      </div>
    </figure>
  );
}
