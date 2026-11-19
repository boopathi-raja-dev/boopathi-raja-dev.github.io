import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

/**
 * Case studies live in src/content/work/*.mdx.
 * Frontmatter holds the structured parts (facts, decisions, result);
 * the MDX body holds "The problem" and "What I did".
 * Everything is validated at build time, so a missing field fails the build.
 */
const caseStudies = defineCollection({
  name: "caseStudies",
  directory: "src/content/work",
  include: "*.mdx",
  schema: z.object({
    /** Outcome-style headline, e.g. "Booking, scheduling and payments across three apps". */
    title: z.string(),
    /** What the product is, without naming the client, e.g. "Salon & spa SaaS". */
    label: z.string(),
    durationShort: z.string(),
    duration: z.string(),
    role: z.string(),
    apps: z.string().optional(),
    /** Short stack line for the facts row. */
    factsStack: z.string(),
    summary: z.string(),
    /** Up to four tags on the home-page card. */
    cardTags: z.array(z.string()).min(1).max(4),
    /** Full stack, shown in the case-study sidebar. */
    stack: z.array(z.string()).min(1),
    visual: z.enum(["calendar", "hierarchy", "bars"]),
    decisions: z.array(z.object({ title: z.string(), body: z.string() })).min(1),
    result: z.string(),
    /** Honest next steps: ideas not yet built, shown under "What I'd improve next". */
    improvements: z.array(z.string()).min(1).max(3),
    order: z.number().int(),
    content: z.string(),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc);
    return { ...doc, slug: doc._meta.path, mdx };
  },
});

export default defineConfig({ content: [caseStudies] });
