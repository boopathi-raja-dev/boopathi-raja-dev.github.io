import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Shows the address as text with a copy button, for people without a mail app. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the address is still visible to copy by hand.
    }
  };

  return (
    <div
      className="flex items-center gap-2 font-mono text-sm text-fog-200"
      data-inspect="CopyEmail"
      data-props={`email="${email}"`}
    >
      <span>{email}</span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1 rounded-md border border-ink-700 px-2 py-1 text-xs text-fog-400 transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-3.5" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
