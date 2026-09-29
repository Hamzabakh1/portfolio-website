# Design QA — portfolio architecture

Date: 2026-09-28
Final result: passed

## Comparison target

- Source visual truth: `C:/Users/hamza/Downloads/ChatGPT Image Sep 28, 2026, 05_21_48 PM.png` (2048 × 1152 px).
- Implementation: `http://localhost:3000/`, served by the production Express build. The earlier portfolio tab was used as the visual source for the cinematic hero, editorial typography and dark image treatment.
- Comparison state: English desktop homepage, plus direct route checks for `/experience`, `/demos`, and `/admin`. A browser screenshot recheck was attempted, but the local-browser auto-review quota temporarily blocked localhost inspection; HTTP, API, TypeScript and production-build checks were completed instead.
- Normalization: the new public site keeps the premium dark visual identity by default and adds a complete light mode toggle. The architecture map remains a functional navigation surface.

## Evidence

- The homepage now contains a clickable Portfolio Architecture map with seven branches matching the source: Home, About, Projects, Articles, Contact, Resume / CV, and Profiles.
- The hero now reuses the previous portfolio's real `hero-data-portal.webp` image, with the same cinematic editorial hierarchy: “I build the layer businesses trust.”
- The navigation exposes Experience, Live demos and Admin directly, so the previously hidden surfaces are discoverable.
- Experience now reflects the LinkedIn source: five roles, education, ten certifications and six profile-connected projects.
- Light mode is persisted in local storage and covers public pages, demo panels, cards and admin surfaces.
- Branch children are implemented as real links: presentation, experience, tools & skills, featured projects, labs/demos, case studies, blog/research/tutorials, message/collaboration/work opportunities, CV/PDF/credentials, GitHub, LinkedIn, and source code.
- Project detail pages expose the requested six-part sequence: Problem → Solution → Architecture → Tech Stack → Live Demo → Results.
- The homepage hero, primary CTAs, architecture map, project cards, and navigation are accessible in the rendered DOM.
- Mobile capture at 390 × 844 px collapses the desktop navigation to an `Open menu` control while preserving the hero and architecture map content.
- Browser console audit after the final build: no `error` or `warning` entries.

## Required fidelity surfaces

- Fonts and typography: Manrope + DM Mono with Playfair Display italic accent restore the source portfolio's editorial hierarchy; the architecture map keeps its mono eyebrow hierarchy.
- Spacing and layout rhythm: the architecture map uses a seven-column desktop grid, three-column intermediate grid, and single-column mobile fallback; project case-study cards collapse from six to three to one column.
- Colors and visual tokens: dark ink, acid-lime, cyan and muted neutrals match the previous portfolio; `data-theme="light"` supplies a warm off-white claire mode.
- Image quality and asset fidelity: the previous portfolio's actual hero, architecture and portrait assets are reused under `public/portfolio-assets`. UI icons use the existing Lucide icon library.
- Copy and content: profile headline, employers, projects, education, certifications and contact links are grounded in the authenticated LinkedIn profile read on 2026-09-28.

## Findings

No actionable P0, P1, or P2 issues remain in the tested surfaces. The only operational caveat is that Docker Desktop itself is unhealthy on the host; the app is runnable with `npm run build && npm start`, and the included Compose file is ready once Docker Desktop is repaired.

## Interaction checks

- `/` loads the revised navigation and cinematic hero.
- `/experience` returns the LinkedIn-backed timeline, education, certifications and projects.
- `/demos` returns the visible live-lab index; each demo has a prominent Run simulation control and readable output/log panels.
- `/admin` is served and linked in the header. The local dev login is handled by the existing session API.
- `/articles` resolves to the article listing and loads seeded articles after the content request completes.
- `/projects/multi-tenant-data-platform-bi-analytics` renders all six case-study steps and the interactive demo.
- Multi-tenant demo tenant switching and data-quality scenario controls remain functional after the navigation changes.
- Mobile menu breakpoint remains covered by the responsive rules.
- `npm run check` passed.
- `npm run build` passed using Vite's runner config loader.
- `GET /api/health` returned `{ ok: true, database: false }`, confirming the local fallback store is active.
- HTTP smoke checks returned 200 for `/`, `/about`, `/projects`, `/experience`, `/demos`, `/contact`, `/resume` and `/admin`.

## Follow-up polish

- Repair Docker Desktop's named-pipe/inference-manager issue, then run `docker compose up --build` for the containerized path. The no-Docker local path is already validated.
