import type { Site } from "./site.schema";

/**
 * All copy for the site lives here. Its shape is checked by TypeScript and
 * validated against `siteSchema` in the unit tests.
 * Client names are intentionally left out (public site).
 */
export const site = {
  name: "Boopathi Raja",
  role: "Frontend Engineer",
  title: "Boopathi Raja — Frontend Engineer (React, TypeScript, AWS)",
  location: "Chennai, India",
  url: "https://boopathi-raja-dev.github.io",
  description:
    "Frontend engineer in Chennai building React + TypeScript apps for SaaS, ERP and e-commerce. AWS Certified Solutions Architect. See my work and get in touch.",
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
      blurb:
        "Protected routes, Zod-validated forms and a cached API layer. Customers module done, invoices in progress.",
      stack: "React · TanStack · Zod · shadcn/ui",
      href: "https://github.com/boopathi-raja-dev/tanstack-invoice-dashboard",
      linkLabel: "GitHub ↗",
    },
    {
      name: "terraform-provider-reactenv",
      blurb:
        "A custom Terraform provider in Go that passes environment variables into Terraform resources for React deployments.",
      stack: "Go · Terraform",
      href: "https://github.com/boopathi-raja-dev/terraform-provider-reactenv",
      linkLabel: "GitHub ↗",
    },
    {
      name: "Trello Clone",
      blurb: "A Trello-style board with lists, cards and drag-to-move, built during my training.",
      stack: "React · TypeScript · Ant Design",
      href: "https://github.com/boopathi-raja-dev/trello-clone-react",
      linkLabel: "GitHub ↗",
    },
    {
      name: "This site",
      blurb:
        "TanStack Start, prerendered to static HTML. A GitHub Actions pipeline runs tests, accessibility and Lighthouse checks, and deploys only when they all pass.",
      stack: "TanStack Start · GitHub Actions",
      href: "https://github.com/boopathi-raja-dev/boopathi-raja-dev.github.io",
      linkLabel: "Source ↗",
      dashed: true,
    },
  ],
  skills: [
    {
      group: "Frontend",
      items: "React, Next.js, Angular, TypeScript, JavaScript, HTML5, CSS3, SCSS",
    },
    {
      group: "State & data",
      items:
        "Redux, Zustand, Context API, TanStack Query / Router / Virtual, React Hook Form, Zod, RxJS, NgRx",
    },
    { group: "UI", items: "Ant Design, shadcn/ui, Tailwind CSS, Motion" },
    { group: "Testing", items: "Vitest, Jest, React Testing Library, MSW, Jasmine, Storybook" },
    {
      group: "Cloud & DevOps",
      items:
        "AWS (S3, CloudFront, Route 53, Cognito), Terraform, GitHub Actions, GitLab CI/CD, Azure Pipelines",
    },
    { group: "Backend", items: "Learning: Node.js, NestJS, Express, PostgreSQL, TypeORM" },
  ],
  experience: [
    {
      period: "Jun 2024 – Present",
      title: "Software Development Engineer I",
      org: "RootQuotient",
      line: "Frontend on 5 client products in React, Angular and TypeScript; CI/CD to AWS; 85%+ test coverage.",
    },
    {
      period: "Dec 2023 – May 2024",
      title: "Software Engineer Intern",
      org: "RootQuotient",
      line: "Frontend training, then rebuilt a money-transfer site's landing page with Stripe. Converted to full-time in 6 months.",
    },
    {
      period: "2020 – 2024",
      title: "B.E. Computer Science",
      org: "Karpagam College of Engineering",
      line: "CGPA 9.05 / 10",
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "AWS Certified Cloud Practitioner",
  ],
  about: [
    "I'm Boopathi, a frontend engineer from Karur, Tamil Nadu. I like the part of software people actually touch: turning a messy workflow into a screen that feels obvious.",
    "At RootQuotient I went from intern to SDE-1, shipping booking systems, a student-housing platform, an e-commerce storefront for a global flooring brand and a greenfield ERP. Along the way I picked up AWS (now certified as a Solutions Architect) and CI/CD, and started learning backend with Node.js and NestJS.",
    "Outside work, I'm sharpening DSA.",
  ],
  contact: {
    heading: "Let's build something people enjoy using.",
    line: "Open to conversations about frontend roles in Chennai and remote. The fastest way to reach me is email.",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
} satisfies Site;
