import { z } from "zod";

/**
 * Shape of the site copy. Used by tests (and type-checking) only, so zod never
 * ships to visitors' browsers.
 */
const link = z.object({ label: z.string(), href: z.url() });

export const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  url: z.url(),
  description: z.string().max(160),
  email: z.email(),
  links: z.object({ github: z.url(), linkedin: z.url() }),
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    sub: z.string(),
  }),
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
  projects: z.array(
    z.object({
      name: z.string(),
      blurb: z.string(),
      stack: z.array(z.string()),
      repo: z.url(),
    }),
  ),
  skills: z.array(z.object({ group: z.string(), items: z.array(z.string()).min(1) })),
  experience: z.array(
    z.object({
      company: z.string(),
      title: z.string(),
      period: z.string(),
      points: z.array(z.string()),
    }),
  ),
  certifications: z.array(z.string()),
  about: z.array(z.string()),
  nav: z.array(link.extend({ href: z.string() })),
});

export type Site = z.input<typeof siteSchema>;
