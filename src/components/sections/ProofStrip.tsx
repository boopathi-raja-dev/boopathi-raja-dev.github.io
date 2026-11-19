import { CountUp } from "~/components/ui/CountUp";
import { site } from "~/content/site";

export function ProofStrip() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-800 bg-ink-800 md:grid-cols-4">
      {site.proof.map((p) => (
        <div key={p.label} className="bg-ink-900 p-6">
          <dt className="text-sm text-fog-500">{p.label}</dt>
          <dd className="mt-2 font-display text-4xl font-semibold text-fog-100">
            <CountUp to={p.value} suffix={p.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
