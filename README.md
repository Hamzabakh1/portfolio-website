# Hamza Bakh — engineering portfolio

React/Vite/TypeScript frontend with an Express/TypeScript backend. The portfolio presents data-engineering case studies and five deterministic browser demonstrations. Existing architecture, admin surface and local fallback storage are preserved.

## Portfolio architecture

The information architecture follows the portfolio map in the product brief:

```text
Home → hero, value proposition, primary CTAs
About → presentation, experience, tools & skills
Projects → featured work, labs, case studies
Articles → blog posts, research notes, tutorials
Contact → message, collaboration, work opportunities
Resume / CV → one-page CV, PDF download, credentials
Profiles → GitHub, LinkedIn, public source code
```

Every project detail page now exposes the same case-study spine: **Problem → Solution → Architecture → Tech Stack → Live Demo → Results**. The home page includes a clickable architecture map so visitors can reach each branch without guessing where content lives.

## Run locally

Install the existing dependencies, then:

~~~sh
npm run dev
~~~

Open http://localhost:3000. For a production build:

~~~sh
npm run check
npm run build
npm start
~~~

The production build uses Vite's runner config loader so it also works from the managed Windows workspace used by Codex. A Docker Compose path is included for a one-command local launch:

~~~sh
docker compose up --build
~~~

Then open [http://localhost:3000](http://localhost:3000). The same site is also runnable without Docker with `npm start` after `npm run build`.

The canonical content routes are `/`, `/about`, `/projects`, `/experience`, `/demos`, `/articles`, `/contact`, `/resume`, and `/admin`. Compatibility aliases remain available at `/insights` and `/cv`.

The public navigation exposes the live labs and the protected Admin entry. In local development the default admin credentials are `admin@local.test` / `change-me-local-admin`; set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before any shared or production deployment.

If PostgreSQL is unavailable, the Express server uses .local-data/portfolio.json and the public site remains usable. PostgreSQL is selected when DATABASE_URL is configured. Copy .env.example to .env for local settings; never commit secrets.

## Demonstrations

/demos is the interactive showcase. DemoShell runs repeatable, client-side logic over synthetic data:

- Multi-tenant analytics: switch Atlas Retail, Nova Foods and GreenFarm Export to inspect isolation, revenue, margin and order metrics.
- Data quality observability: switch clean/moderate/severe scenarios and inspect rule-level warnings and release gates.
- Automated validation: inspect schema, type, null and duplicate checks without persisting uploaded data.
- Azure real-estate platform: follow the simulated Blob → ADF → Azure SQL → Power BI lifecycle and raw/clean/curated counts.
- Finance planning: compare synthetic budget, actual, variance and forecast by department.

Infrastructure services are labelled as simulations. Private projects show that source code is private while still exposing safe synthetic demos. No credentials, client information or production data are included.

## Extending a demo

Add project metadata to src/data/projectRegistry.ts, deterministic calculations to src/lib/demoEngine.ts, and the route is automatically available at /demos/:slug. DemoShell exposes controls, explicit pipeline states, output tables, logs and an explanation panel. Keep the same input deterministic and label any simulated infrastructure honestly.

## Security and privacy

The upload endpoint accepts images for the existing admin surface and is size-limited. Demo data stays in memory. Contact writes are rate-limited and protected by CSRF tokens. Set SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, PUBLIC_SITE_URL, and database/email variables through the environment, never in client code.

## Scope notes

The portfolio is intentionally not migrated to Next.js and does not require Docker for visitors. Real Snowflake, Azure, Power BI and private repository access are not executed from the public site; those workflows are represented by deterministic simulations or case-study content.
