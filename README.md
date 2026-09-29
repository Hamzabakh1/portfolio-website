# Hamza Bakh — Data Engineering Portfolio

A bilingual portfolio for data engineering, analytics engineering and business intelligence work. It combines a cinematic presentation layer with practical case studies, interactive pipeline demonstrations and a small content-admin surface.

## Highlights

- Dark and light themes with English and French translations.
- Case studies covering pipeline design, data quality, BI delivery and automation.
- Interactive demos with synthetic data, pipeline stages, logs, output tables and execution history.
- Responsive pages for projects, experience, articles, CV and contact.
- Express API with a local JSON fallback and optional PostgreSQL storage.

## Run locally

Install dependencies, then start the development server:

```sh
npm install
npm run dev
```

Open <http://localhost:3000>.

For a production build:

```sh
npm run check
npm run build
npm start
```

Docker Compose is also available:

```sh
docker compose up --build
```

## Main routes

- `/` — home and featured work
- `/about` — profile and working principles
- `/projects` — projects and case studies
- `/experience` — roles, education and certifications
- `/demos` — interactive engineering demonstrations
- `/articles` — technical writing
- `/contact` — contact form and collaboration
- `/resume` — CV and downloadable resume
- `/admin` — protected content management

## Demonstrations

The demo area uses deterministic synthetic datasets so every run is reproducible:

- Multi-tenant analytics with revenue, margin and order metrics.
- Data quality observability with rule-level checks and release gates.
- Schema, type, null and duplicate validation.
- A simulated cloud real-estate pipeline from ingestion to BI output.
- Finance planning with budget, actual, variance and forecast views.

Each demo clearly labels simulated infrastructure and keeps data in the browser.

## Configuration

Copy `.env.example` to `.env` for local settings. Never commit secrets. PostgreSQL is used when `DATABASE_URL` is configured; otherwise the server stores local development data under `.local-data`.

Before any shared deployment, set `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `PUBLIC_SITE_URL` through the hosting environment.

## Project structure

```text
src/          React pages, components and translations
server/       Express API and local persistence
shared/       Shared types and database schema
public/       Brand assets and static content
```

The portfolio is intentionally built with Vite, React and TypeScript and can run with or without Docker.
