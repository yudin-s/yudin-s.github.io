# Phases

## Phase 0 - Alignment

- Confirm visual direction. Done: Product OS + Open Source Ledger + Agent Lab.
- Confirm Product Hunt links. Done: https://www.producthunt.com/@sergeyudin
- Confirm whether current phone/email should stay public.
- Decide whether to use the existing portrait or new supplied photos.

## Phase 1 - Content Model

- Convert current content into typed data files.
- Normalize name spelling, role titles, social links, contacts, projects, education, and experience.
- Add sections for Product Hunt, NestJS contribution, Tailwind CSS contribution, Upwork proof, and selected AI tools.

## Phase 2 - Stack Migration

- Replace Nuxt 2 setup with React + Vite or Next.js static export. Done with React + Vite.
- Add Tailwind CSS, Framer Motion, lucide-react, and static deploy config for GitHub Pages. Done.
- Preserve SEO metadata, sitemap, robots, and analytics if desired. SEO, sitemap, robots, and 404 route fallback added.

## Phase 3 - UI Build

- Build responsive app shell, hero, proof bar, selected work, open-source, experience, stack, Product Hunt, contact. Done.
- Add interactive filtering/search for cases and skills. Replaced with a focused case grid and skill system for this iteration.
- Add a signature animation or sprite system based on the chosen direction. Done with Agent Lab map and sprites.

## Phase 4 - Assets

- Reuse existing images where useful.
- Replace placeholder portfolio titles with real cases.
- If new photos are provided, create design-aligned treatments while preserving likeness.

## Phase 5 - QA

- Run build, lint, and tests. Build and lint pass.
- Verify with browser screenshots on desktop and mobile. Done on local Vite server.
- Check animation reduced-motion behavior, focus states, content fit, and basic Lighthouse-style constraints. Reduced-motion CSS and focus states added; npm audit passes with 0 vulnerabilities.

## Phase 6 - Publish

- Prepare commit and push branch.
- Open draft PR.
- After approval, publish through GitHub Pages workflow or branch strategy.
