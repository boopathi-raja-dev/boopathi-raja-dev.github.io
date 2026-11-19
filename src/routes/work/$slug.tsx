import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allCaseStudies } from "content-collections";
import { ArrowLeft } from "lucide-react";
import { CaseVisual } from "~/components/work/CaseVisual";
import { Scheduler } from "~/components/work/Scheduler";
import { site } from "~/content/site";
import { seo } from "~/lib/seo";

const ordered = () => [...allCaseStudies].sort((a, b) => a.order - b.order);

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const list = ordered();
    const index = list.findIndex((s) => s.slug === params.slug);
    const study = list[index];
    if (!study) throw notFound();
    const next = list[(index + 1) % list.length] ?? study;
    return { study, next: { slug: next.slug, label: next.label } };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? seo({
          title: loaderData.study.label,
          description: loaderData.study.summary,
          path: `/work/${params.slug}/`,
        })
      : [],
  }),
  component: CaseStudyPage,
});

const ILLUSTRATION_CAPTION = {
  calendar: "Staff scheduler",
  hierarchy: "Allocation hierarchy",
  bars: "Lighthouse score, before and after",
} as const;

function CaseStudyPage() {
  const { study, next } = Route.useLoaderData();

  const facts = [
    { label: "Duration", value: study.duration },
    { label: "Role", value: study.role },
    ...(study.apps ? [{ label: "Apps", value: study.apps }] : []),
    { label: "Stack", value: study.factsStack },
  ];

  return (
    <article>
      {/* Header */}
      <header className="container-page flex flex-col gap-5 pt-14 pb-10">
        <Link
          to="/"
          hash="work"
          className="inline-flex w-fit items-center gap-2 text-sm text-fog-400 hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> All work
        </Link>
        <p className="mt-4 text-sm font-semibold tracking-[3px] text-accent uppercase">
          Case study · {study.label}
        </p>
        <h1 className="max-w-[860px] font-display text-[clamp(34px,4.6vw,56px)] leading-[1.08] font-bold tracking-[-0.5px] text-white">
          {study.title}
        </h1>
        <p className="max-w-[720px] text-lg leading-relaxed text-fog-200">{study.summary}</p>
      </header>

      {/* Facts */}
      <section aria-label="Project facts" className="container-page">
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] rounded-[14px] border border-line bg-ink-900">
          {facts.map((f) => (
            <div
              key={f.label}
              className="flex flex-col gap-1 border-line p-5 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r"
            >
              <dt className="text-[13px] text-fog-400">{f.label}</dt>
              <dd className="font-medium text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Illustration */}
      <section aria-label="Illustration" className="container-page py-10">
        <figure className="overflow-hidden rounded-[14px] border border-line bg-ink-975">
          <figcaption className="flex flex-wrap justify-between gap-2 border-b border-line px-5 py-3 text-xs text-fog-400">
            <span>
              Illustration: {ILLUSTRATION_CAPTION[study.visual]} (rebuilt, not a client screenshot)
            </span>
          </figcaption>
          <div className="p-5">
            {study.visual === "calendar" ? (
              <Scheduler />
            ) : (
              <CaseVisual kind={study.visual} play loop framed={false} />
            )}
          </div>
        </figure>
      </section>

      {/* Body + sidebar */}
      <div className="container-page grid gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-12">
          <div className="prose-case">
            <MDXContent code={study.mdx} />
          </div>

          <section aria-labelledby="decisions-title" className="flex flex-col gap-5">
            <h2 id="decisions-title" className="font-display text-[28px] font-semibold text-white">
              Key decisions
            </h2>
            <ol className="flex flex-col gap-4">
              {study.decisions.map((d, i) => (
                <li
                  key={d.title}
                  className="reveal flex gap-4 rounded-xl border border-line bg-ink-900 p-5"
                >
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-white">{d.title}</h3>
                    <p className="leading-relaxed text-fog-200">{d.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="result-title" className="reveal flex flex-col gap-3">
            <h2 id="result-title" className="font-display text-[28px] font-semibold text-white">
              Result
            </h2>
            <p className="text-lg leading-relaxed text-fog-200">{study.result}</p>
          </section>

          <section aria-labelledby="next-title" className="reveal flex flex-col gap-4">
            <h2 id="next-title" className="font-display text-[28px] font-semibold text-white">
              What I'd improve next
            </h2>
            <ul className="flex flex-col gap-3">
              {study.improvements.map((idea) => (
                <li key={idea} className="flex gap-3 leading-relaxed text-fog-200">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-accent">
                    →
                  </span>
                  {idea}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-5 self-start lg:sticky lg:top-24">
          <div className="rounded-[14px] border border-line bg-ink-900 p-6">
            <h2 className="text-sm font-semibold text-white">Full stack used</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <li key={s} className="rounded-full bg-[#13213a] px-2.5 py-1 text-xs text-fog-200">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[14px] border border-accent/30 bg-accent/5 p-6">
            <h2 className="font-semibold text-white">Want the details?</h2>
            <p className="mt-2 text-sm leading-relaxed text-fog-200">
              Happy to walk through how this was built in an interview.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm font-semibold text-accent hover:text-[#bae6fd]"
            >
              Get in touch <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>
      </div>

      {/* Prev / next */}
      <nav aria-label="Case studies" className="border-t border-line">
        <div className="container-page flex items-center justify-between gap-6 py-8">
          <Link to="/" hash="work" className="text-sm text-fog-400 hover:text-accent">
            ← All work
          </Link>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="flex flex-col items-end gap-1 text-fog-100 hover:text-accent"
          >
            <span className="text-[13px] text-fog-400">Next case study</span>
            <span className="font-display text-xl font-semibold">
              {next.label} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
