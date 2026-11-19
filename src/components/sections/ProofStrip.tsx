import { CountUp } from "~/components/ui/CountUp";
import { site } from "~/content/site";

const NUMBER = "font-display text-4xl font-bold";

export function ProofStrip() {
  return (
    <section aria-label="Highlights" className="border-b border-line bg-ink-900">
      <dl className="container-page grid grid-cols-2 gap-6 py-9 sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))]">
        {site.proof.map((p) => (
          <div key={p.label} className="flex flex-col gap-1.5">
            <dt className="text-sm leading-normal text-fog-400">{p.label}</dt>
            <dd className={`${NUMBER} order-first text-white`}>
              <CountUp to={p.value} prefix={p.prefix} suffix={p.suffix} />
            </dd>
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <dt className="text-sm leading-normal text-fog-400">{site.certifications[0]}</dt>
          <dd className={`${NUMBER} order-first text-accent`}>AWS</dd>
        </div>
      </dl>
    </section>
  );
}
