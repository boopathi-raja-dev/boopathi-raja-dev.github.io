import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allCaseStudies } from "content-collections";
import { ArrowLeft } from "lucide-react";
import { seo } from "~/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = allCaseStudies.find((s) => s.slug === params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? seo({
          title: loaderData.title,
          description: loaderData.summary,
          path: `/work/${params.slug}/`,
        })
      : [],
  }),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const study = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        to="/"
        hash="work"
        className="inline-flex items-center gap-2 text-sm text-fog-500 hover:text-accent"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> All work
      </Link>
      <p className="mt-10 font-mono text-sm text-accent">{study.category}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {study.title}
      </h1>
      <p className="mt-6 text-lg text-fog-300">{study.summary}</p>

      <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-ink-800 py-6 text-sm md:grid-cols-4">
        <div>
          <dt className="text-fog-500">Role</dt>
          <dd className="mt-1">{study.role}</dd>
        </div>
        <div>
          <dt className="text-fog-500">Duration</dt>
          <dd className="mt-1">{study.duration}</dd>
        </div>
        {study.apps ? (
          <div>
            <dt className="text-fog-500">Surface</dt>
            <dd className="mt-1">{study.apps}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-fog-500">Stack</dt>
          <dd className="mt-1">{study.stack.join(", ")}</dd>
        </div>
      </dl>

      <div className="prose-case">
        <MDXContent code={study.mdx} />
      </div>
    </article>
  );
}
