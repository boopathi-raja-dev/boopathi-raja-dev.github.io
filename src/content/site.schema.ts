import { z } from "zod";

/**
 * Shape of the site copy. Used by tests (and type-checking) only, so zod never
 * ships to visitors' browsers.
 */
export const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  title: z.string(),
  location: z.string(),
  url: z.url(),
  description: z.string().max(160),
  email: z.email(),
  links: z.object({ github: z.url(), linkedin: z.url() }),
  hero: z.object({ eyebrow: z.string(), headline: z.string(), sub: z.string() }),
  proof: z
    .array(
      z.object({
        value: z.number(),
        prefix: z.string().optional(),
        suffix: z.string().optional(),
        label: z.string(),
      }),
    )
    .length(4),
  projects: z
    .array(
      z.object({
        name: z.string(),
        blurb: z.string(),
        stack: z.string(),
        href: z.url(),
        linkLabel: z.string(),
        /** Dashed outline, used for "This site". */
        dashed: z.boolean().optional(),
      }),
    )
    .min(1),
  skills: z.array(z.object({ group: z.string(), items: z.string() })).min(1),
  experience: z.array(
    z.object({ period: z.string(), title: z.string(), org: z.string(), line: z.string() }),
  ),
  certifications: z.array(z.string()).min(1),
  about: z.array(z.string()).min(1),
  contact: z.object({ heading: z.string(), line: z.string() }),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
});

export type Site = z.input<typeof siteSchema>;
