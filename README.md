# Hamza Bakh Portfolio Platform

Production-ready personal portfolio platform for Hamza Bakh: Data Engineer, Data Analyst, BI Developer, and full-stack builder.

## Architecture

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide icons.
- Backend: Node.js, Express, secure sessions, rate limiting, Helmet headers, CSRF session token checks.
- Database: PostgreSQL via `DATABASE_URL`.
- ORM/schema: Drizzle ORM tables in `shared/schema.ts`.
- Validation: Zod schemas shared across client and server.
- Admin: protected `/admin` area for projects, articles, and contact messages.
- Email: optional Resend notification when `RESEND_API_KEY` and `CONTACT_RECEIVER_EMAIL` are configured.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and fill in values:

```bash
DATABASE_URL=postgres://user:password@host:5432/database
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-strong-password
SESSION_SECRET=replace-with-a-long-random-secret
PUBLIC_SITE_URL=http://localhost:3000
```

3. Optional: apply database tables and seed editable content if you are using PostgreSQL:

```bash
npm run db:migrate
npm run db:seed
```

4. Start the app:

```bash
npm run dev
```

The app runs at `http://localhost:3000` by default. Health check: `GET /api/health`.

### Local PC Server Mode

The app also works without `DATABASE_URL`. In that mode it uses a local JSON file at `.local-data/portfolio.json` for:

- public projects, articles, skills, and experience
- contact form messages
- admin edits
- basic analytics events

Default local admin credentials, only when `NODE_ENV` is not production and no admin env vars are set:

```text
admin@local.test
change-me-local-admin
```

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` to replace those defaults.

## Production Build

```bash
npm run build
npm start
```

The production server serves `dist/public` and exposes the Express API from the same origin.

## GitHub Pages Hosting

This project includes `.github/workflows/pages.yml` for GitHub Pages.

GitHub Pages hosting is static-only:

- The public portfolio works.
- Routing uses hash URLs in Pages mode, for example `/#/projects`.
- Contact falls back to opening the visitor's email app.
- Admin, local JSON storage, uploads, and server-backed contact messages require the Node server on your PC or another backend host.

After pushing to GitHub:

1. Go to the repository on GitHub.
2. Open `Settings` → `Pages`.
3. Set the Pages source to `GitHub Actions`.
4. Push to `main`; the workflow deploys `dist/public`.

## Admin Access

Visit `/admin` and log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

The seed script creates an admin user with an Argon2 password hash when both variables are present. The login endpoint also accepts the environment admin credentials as a fallback so a first deployment is not locked out. In local PC mode, admin edits are saved to `.local-data/portfolio.json`.

## Updating Content

- Projects and articles can be created, edited, deleted, featured, and published from `/admin`.
- The Admin Studio tab edits public sections: profile, hero, about, contact, trust strip, impact cards, operating model, and code snippets.
- The Assets tab uploads local images to `/uploads/...`; use the returned URL inside project images, article covers, profile avatar, or section JSON.
- Contact messages are stored in `contact_messages`.
- Skills and experience can be managed from `/admin`.
- Place a CV PDF at `public/Hamza-Bakh-CV.pdf` when available.
- Replace placeholder links for LinkedIn, GitHub, email, profile image, screenshots, and logos before launch.

## Replit Deployment Checklist

- Add a Replit PostgreSQL database and copy its connection string to `DATABASE_URL`.
- Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a long `SESSION_SECRET`.
- Set `PUBLIC_SITE_URL` to the deployed site URL.
- Optional: set `RESEND_API_KEY` and `CONTACT_RECEIVER_EMAIL`.
- Run `npm run db:migrate` and `npm run db:seed`.
- Use `npm run build` before deployment.
- Use `npm start` as the run command.

## Security Notes

- Secrets are read only from environment variables.
- Passwords are hashed with Argon2.
- Session cookies are HTTP-only and secure in production.
- Contact and login endpoints are rate limited.
- Write endpoints require a session CSRF token.
- SQL is issued through Drizzle ORM or fixed migration SQL, not string-built user queries.

## Verification

Current verified commands:

```bash
npm run check
npm run build
npm audit --omit=dev
```

Smoke-tested production server on port `3100`:

- `/api/health` returned `{ "ok": true, "database": false }` without a configured database.
- `/` returned HTTP `200`.
- `/api/content` returned HTTP `503` as expected without `DATABASE_URL`.
