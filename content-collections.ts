import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

/**
 * Case studies live in src/content/work/*.mdx.
 * The frontmatter is validated at build time — a missing or wrong field fails the build.
 */
const caseStudies = defineCollection({
  name: "caseStudies",
  directory: "src/content/work",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    duration: z.string(),
    role: z.string(),
    apps: z.string().optional(),
    stack: z.array(z.string()).min(1),
    tags: z.array(z.string()).max(4),
    order: z.number().int(),
    content: z.string(),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc);
    return { ...doc, slug: doc._meta.path, mdx };
  },
});

export default defineConfig({ content: [caseStudies] });
