# Governance and Security Initiative (GSi) Website

Official website for the Governance and Security Initiative (GSi), built with Next.js, TypeScript, and Tailwind CSS.

## Tech stack

- Next.js 16 (App Router, standalone output)
- TypeScript
- Tailwind CSS v4 + shadcn/ui components
- Markdown-driven content (`content/articles`, `content/training`)
- Prisma (SQLite schema available for future data-backed features)

## Features

- Public pages: home, about, training, blog, cookies, privacy, and terms
- Dynamic blog and training detail pages from local Markdown files
- SEO metadata, Open Graph images, sitemap, and robots.txt
- Theming support (light/dark)
- Accessible baseline patterns (skip link, semantic layout)

## Project structure

```text
src/app            # Routes and page-level files
src/components     # UI and site components
src/lib            # Site config, content utilities, shared helpers
content/articles   # Article posts in Markdown
content/training   # Training pages in Markdown
prisma             # Prisma schema
public             # Static assets
```

## Prerequisites

- Node.js 20+
- npm (or Bun if you want to run the production standalone server with the existing script)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file (or `.env.local`) in project root:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   DATABASE_URL="file:./dev.db"
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Available scripts

- `npm run dev` — Start Next.js dev server on port `3000` and write logs to `dev.log`
- `npm run build` — Create production build with standalone output
- `npm run start` — Start standalone server using Bun (`.next/standalone/server.js`)
- `npm run lint` — Run ESLint
- `npm run db:generate` — Generate Prisma client
- `npm run db:push` — Push schema to database
- `npm run db:migrate` — Create/apply development migration
- `npm run db:reset` — Reset database and reapply migrations

## Content management

All editorial content is Markdown-based.

- Add article posts in `content/articles/*.md`
- Add training pages in `content/training/*.md`

Use the frontmatter formats and editorial workflow described in `content/README.md` and `docs/editorial-workflow.md`.

## Deployment notes

- `next.config.ts` is configured with `output: 'standalone'`
- `Caddyfile` is included for reverse proxying to port `3000`
- Set `NEXT_PUBLIC_SITE_URL` to your production domain for canonical/OG metadata

## License

This repository currently does not define a license. Add one if you plan to distribute it publicly.
