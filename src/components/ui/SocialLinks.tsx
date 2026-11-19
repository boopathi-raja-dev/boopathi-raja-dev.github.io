import { site } from "~/content/site";

const icon = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const LINKS = [
  {
    label: "LinkedIn",
    href: site.links.linkedin,
    svg: (
      <svg aria-hidden="true" {...icon}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: site.links.github,
    svg: (
      <svg aria-hidden="true" {...icon}>
        <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.6 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.5 12.5 0 0 0-6.5 0C6 1.1 4.9 1.4 4.9 1.4a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.4 8.5c0 5.1 3 6.3 6 6.6a3 3 0 0 0-.9 2.3V21" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    svg: (
      <svg aria-hidden="true" {...icon}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export function SocialLinks() {
  return (
    <ul className="flex gap-5">
      {LINKS.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            aria-label={l.label}
            className="inline-flex p-1.5 text-fog-400 transition-colors hover:text-accent"
          >
            {l.svg}
          </a>
        </li>
      ))}
    </ul>
  );
}
