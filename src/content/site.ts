import type { Site } from "./site.schema";

/**
 * All copy for the site lives here. Its shape is checked by TypeScript and
 * validated against `siteSchema` in the unit tests.
 * Client names are intentionally left out (public site).
 */
export const site = {
  name: "Boopathi Raja",
  role: "Frontend Engineer",
  location: "Chennai, India",
  url: "https://boopathi-raja-dev.github.io",
  description:
    "Frontend engineer building React + TypeScript products — booking systems, ERPs and storefronts — that people enjoy using.",
  email: "boopathiraj948@gmail.com",
  links: {
    github: "https://github.com/boopathi-raja-dev",
    linkedin: "https://www.linkedin.com/in/boopathi-raja-dev",
  },
  hero: {
    eyebrow: "Frontend Engineer · Chennai",
    headline: "I build the frontends complex businesses run on.",
    sub: "React and TypeScript engineer with nearly 3 years shipping SaaS, ERP and e-commerce products. AWS Certified Solutions Architect, growing into full-stack.",
  },
  proof: [
    { value: 6, label: "client products shipped" },
    { value: 50, suffix: "+", label: "countries served by a money-transfer site I rebuilt" },
    { value: 20, prefix: "+", label: "Lighthouse points from SSR and performance work" },
    { value: 85, suffix: "%+", label: "test coverage held with Vitest + RTL" },
  ],
  projects: [
    {
      name: "TanStack Invoice Dashboard",
      blurb: "Invoicing dashboard on TanStack Router + Query with typed forms and tables.",
      stack: ["React", "TypeScript", "TanStack"],
      repo: "https://github.com/boopathi-raja-dev/tanstack-invoice-dashboard",
    },
    {
      name: "Trello Clone",
      blurb: "Boards, lists and cards with drag interactions, built during internship training.",
      stack: ["React", "TypeScript", "Ant Design"],
      repo: "https://github.com/boopathi-raja-dev/trello-clone-react",
    },
    {
      name: "Terraform Provider: ReactEnv",
      blurb: "A small custom Terraform provider exploring infra-as-code for frontend env config.",
      stack: ["Go", "Terraform"],
      repo: "https://github.com/boopathi-raja-dev/terraform-provider-reactenv",
    },
    {
      name: "Marvel API Explorer",
      blurb:
        "Search and browse Marvel characters with a vanilla JS client and paginated API calls.",
      stack: ["JavaScript", "REST"],
      repo: "https://github.com/boopathi-raja-dev/marvel-api-explorer",
    },
  ],
  skills: [
    { group: "Core", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS"] },
    { group: "State & data", items: ["TanStack Query", "Zustand", "Redux", "React Hook Form"] },
    { group: "UI", items: ["Ant Design", "Tailwind CSS", "Storybook"] },
    { group: "Testing", items: ["Vitest", "React Testing Library"] },
    {
      group: "Cloud & delivery",
      items: ["AWS S3", "CloudFront", "Route 53", "Terraform", "GitHub Actions", "GitLab CI"],
    },
  ],
  experience: [
    {
      company: "RootQuotient Technologies",
      title: "Software Development Engineer I",
      period: "Jun 2024 — Present",
      points: [
        "Built and maintained React + TypeScript frontends for booking, ERP and residency-management products.",
        "Set up CI/CD pipelines deploying dev, UAT and prod builds to S3 + CloudFront.",
      ],
    },
    {
      company: "RootQuotient Technologies",
      title: "Software Engineering Intern",
      period: "Dec 2023 — May 2024",
      points: [
        "Frontend training track: HTML/CSS, vanilla JS, then React + TypeScript + Ant Design.",
      ],
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "AWS Certified Cloud Practitioner",
  ],
  about: [
    "I'm a frontend engineer from Tamil Nadu, now based in Chennai. I like the part of the job where a messy business process becomes a screen people actually understand.",
    "Most of my work has been data-heavy apps — calendars, inventories, multi-step forms — where performance and clarity matter more than flash.",
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
} satisfies Site;
