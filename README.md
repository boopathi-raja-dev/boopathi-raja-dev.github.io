# boopathi-raja-dev.github.io

Personal portfolio of **Boopathi Raja**, frontend engineer in Chennai.
Live at **https://boopathi-raja-dev.github.io**.

## Stack

| Area      | Choice                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------- |
| Framework | TanStack Start (React 19) + TanStack Router, fully prerendered to static HTML                     |
| Language  | TypeScript (strict, `noUncheckedIndexedAccess`)                                                   |
| Styling   | Tailwind CSS v4 with design tokens in `src/styles/app.css`                                        |
| Motion    | Motion (`motion/react`) with `LazyMotion`, respects `prefers-reduced-motion`                      |
| Content   | Site copy validated with zod (`src/content/site.ts`); case studies in MDX via content-collections |
| Quality   | Biome (lint + format), Vitest + Testing Library, Playwright + axe, Lighthouse CI                  |
| Workflow  | pnpm, Husky + lint-staged, commitlint (Conventional Commits), Renovate                            |
| Deploy    | GitHub Actions → GitHub Pages                                                                     |

## Getting started

```bash
corepack enable
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command                         | What it does                                          |
| ------------------------------- | ----------------------------------------------------- |
| `pnpm dev`                      | Dev server on port 3000                               |
| `pnpm build`                    | Prerenders every page to `dist/client`                |
| `pnpm preview`                  | Serves the built site on port 4173                    |
| `pnpm check` / `pnpm check:fix` | Biome lint + format                                   |
| `pnpm typecheck`                | TypeScript, no emit                                   |
| `pnpm test`                     | Unit tests (Vitest)                                   |
| `pnpm test:e2e`                 | Browser tests + accessibility scan (Playwright + axe) |
| `pnpm lhci`                     | Lighthouse CI (needs a build first)                   |

## Project structure

```
src/
  routes/            File-based routes (TanStack Router)
    __root.tsx       HTML shell, <head>, nav, footer
    index.tsx        Home page
    work/$slug.tsx   Case study page
  components/
    layout/          Nav, Footer
    sections/        Hero, ProofStrip, WorkCards, Projects, Skills, Experience, About, Contact
    ui/              Section, Reveal, CountUp
  content/
    site.ts          All site copy (zod-validated)
    work/*.mdx       Case studies (frontmatter validated at build)
  lib/               cn(), seo()
  styles/app.css     Tailwind theme tokens
tests/
  unit/              Vitest
  e2e/               Playwright + axe
```

## Editing content

- Text on the home page: `src/content/site.ts`
- A case study: `src/content/work/<slug>.mdx`. A new `.mdx` file becomes a new page at `/work/<slug>/`.
- Résumé: replace `public/resume.pdf`

## Deploying

Push to `main`. The **Deploy to GitHub Pages** workflow builds the site and publishes `dist/client`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

## Roadmap

- [ ] Hero code-editor typing animation, cursor spotlight, animated case-card visuals
- [ ] Open Graph image, sitemap
- [ ] ⌘K command palette, light/dark toggle
- [ ] Custom domain on AWS (S3 + CloudFront + Route 53, Terraform)
