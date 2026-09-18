# Instinct Studio

A creative sports house. Cinematic films, original concepts and immersive
experiences centred on athletes. Built with Next.js (App Router) and
TypeScript, no external CMS or database — content lives in a handful of
`src/data/*` files.

> **This repository started empty.** There was no prior codebase, framework,
> media, or portraits to build on, so this is a fresh Next.js scaffold rather
> than a redesign. Everything under "Placeholders to replace" below is
> illustrative content standing in for real media and confirmed facts.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- Plain CSS: design tokens in `src/app/globals.css`, CSS Modules per
  component/page. No UI framework or CSS-in-JS.
- Fonts loaded via `next/font/google` (Fraunces for editorial display type,
  Inter for UI/body text) — self-hosted at build time, no render-blocking
  external font requests.
- No database: all content is TypeScript data under `src/data/`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Useful scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (next/core-web-vitals + TypeScript)
node scripts/generate-placeholders.mjs   # regenerate placeholder posters/portraits
```

There is no test suite yet (none existed to begin with, and no testing
framework — Jest/Vitest/Playwright — is installed). `npm run lint` and
`npm run build` (which runs the TypeScript compiler) are the current
correctness checks.

## Project structure

```
src/
  app/                    routes (App Router)
    page.tsx              home
    films/page.tsx        films index
    films/[slug]/page.tsx film detail (generateStaticParams for all films)
    studio/page.tsx
    process/page.tsx
    collaborate/
      page.tsx
      actions.ts          server action for the contact form
    sitemap.ts, robots.ts
    layout.tsx            fonts, nav/footer, global metadata, JSON-LD
    globals.css           design tokens + base styles
  components/             shared UI (Nav, Footer, ShowreelPlayer, FilmCard, …)
  data/                   films.ts, team.ts, services.ts, process.ts, site.ts
public/
  media/posters/          film poster images (placeholders for now)
  assets/team/            team portraits (placeholders for now)
scripts/
  generate-placeholders.mjs   regenerates the SVG placeholders below
```

## Editing content

All copy and structured content is centralized so you never need to hunt
through JSX:

- **Films** — `src/data/films.ts`. Each entry is a `Film` object.
- **Team** — `src/data/team.ts` (three founders + the Art Director in
  Residence).
- **Services** — `src/data/services.ts`.
- **Process / method** — `src/data/process.ts`.
- **Site-wide config** (name, taglines, nav, social links, contact email) —
  `src/data/site.ts`.

### Adding a new film

1. Add an entry to the `films` array in `src/data/films.ts` with a unique
   `id`/`slug` and an `order`.
2. Drop a poster image at `public/media/posters/<slug>.{svg,jpg,webp}` and
   point `poster` at it (16:9, e.g. 1600×900).
3. Leave `videoUrl` empty until a hosted video exists — the site
   automatically shows a "Film coming soon" poster state instead of a
   broken player.
4. Only fill in `athlete`, `client`, `year`, `duration` and `credits` once
   they're confirmed — the detail page only renders fields that have a
   value, so it never shows invented facts.
5. `/films/<slug>` is generated automatically at build time
   (`generateStaticParams` in `src/app/films/[slug]/page.tsx`).

### Adding/replacing a poster or portrait

Posters live in `public/media/posters/`, portraits in
`public/assets/team/`. Any modern image format works (`.jpg`, `.webp`,
`.avif`, `.svg`); just update the corresponding path in `films.ts` (poster)
or `team.ts` (`portraitSlug`, used as
`/assets/team/<portraitSlug>-placeholder.svg` by the team components — once
you have a real photo, update the `src` in `TeamMemberCard.tsx` /
`ResidentStrip` / `studio/page.tsx` to point at it instead of the
`-placeholder.svg` convention, or simply keep the same filename and replace
the SVG with a raster image and adjust the extension there).

Local images render through `next/image` with `unoptimized` (appropriate for
the current placeholder SVGs). Once real JPG/PNG/WebP photography is in
place, drop `unoptimized` so Next.js's built-in image optimization kicks in.

### Connecting a real video (showreel or a film)

The `ShowreelPlayer` component and each film detail page both accept a
`videoUrl`. Point it at any direct, browser-playable URL:

- **Self-hosted / CDN**: upload an optimized MP4/WebM and use its public
  URL directly.
- **Cloudflare Stream**: use the HLS manifest URL, or embed via Stream's
  `<iframe>` player instead of the `<video>` tag if you want adaptive
  bitrate (would require a small change to `ShowreelPlayer.tsx`/the film
  page to swap the `<video>` element for an `<iframe>`).
- **Mux**: same approach — either a direct playback URL or Mux's player
  embed.
- **Vimeo**: use an unlisted/private video's direct file URL if available,
  or embed the Vimeo player via `<iframe>` (same caveat as above).
- **YouTube (unlisted)**: embed via `<iframe>` rather than `<video>`, since
  YouTube doesn't expose direct file URLs.

None of the ten source files listed in the project brief (from the shared
Drive folder) are committed to this repository — multi-gigabyte video
should never live in git. Upload them to one of the above and set
`videoUrl` per film once each is ready.

### Configuring the contact form

`src/app/collaborate/actions.ts` is a Next.js Server Action. It reads
`CONTACT_FORM_ENDPOINT` **server-side only** (never expose it as
`NEXT_PUBLIC_*`) and POSTs the form as JSON when it's set:

```bash
CONTACT_FORM_ENDPOINT=https://your-intake-service.example.com/inquiries
```

If it's unset, the form still renders and validates, but submitting shows a
message pointing to the fallback email in `src/data/site.ts`
(`contactEmail`) instead of sending anywhere — the site never posts to a
non-existent destination.

## Placeholders to replace

Because the repository was empty, the following stand in for real assets
and facts. All are clearly labelled in the UI or code comments:

- **All 10 posters** (`public/media/posters/*.svg`) and **all 4 team
  portraits** (`public/assets/team/*-placeholder.svg`) are generated
  placeholders (see `scripts/generate-placeholders.mjs`). No real photos or
  frame grabs were available in the repo to use instead.
- **All `videoUrl` fields are empty** — every film and the homepage
  showreel show a "coming soon" state. The 10 source files named in the
  brief live in a Drive folder and were intentionally not downloaded or
  committed (multi-GB video shouldn't live in git); see "Connecting a real
  video" above.
- **Athlete, client, year, duration and full credits** are left blank for
  every film — the brief explicitly asked not to invent clients, athletes
  or credits, so only the confirmed title/category/synopsis/language fields
  are filled in.
- **The "How we think" storyboard visual** on the homepage is an abstract
  SVG sketch, not a real production storyboard.
- **The PürInstinct case study on `/process`** is explicitly labelled
  "illustrative" — a walk-through of the method rather than a documented
  past project.
- **`contactEmail`** in `src/data/site.ts`
  (`hello@instinctstudio.studio`) is a placeholder address — replace it
  with the studio's real inbox.
- **`NEXT_PUBLIC_SITE_URL`** defaults to `https://instinctstudio.studio`,
  a placeholder domain used for metadata/sitemap URLs until a real domain
  is assigned.
- **Instagram/Vimeo links** in `src/data/site.ts` (`socialLinks`) are empty
  on purpose — the footer only renders a link once a URL is filled in.
- **Budget ranges and timelines** in the Collaborate form
  (`src/components/ContactForm.tsx`) are generic placeholder options —
  adjust to match how the studio actually wants to qualify inquiries.
- **Favicon** (`src/app/icon.svg`) is a temporary "IS" monogram, since no
  studio logo exists in the repo.

## Environment variables

See `.env.example`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No (has a placeholder default) | Base URL used in metadata, Open Graph tags and `sitemap.xml`. |
| `CONTACT_FORM_ENDPOINT` | No | Server-only. If set, the Collaborate form POSTs JSON here. If unset, the form shows an email fallback instead. |

## Deployment

This is a standard Next.js app — deploy it anywhere that supports Next.js
(Vercel, or any Node host via `npm run build && npm run start`). Set the
environment variables above in your hosting provider's dashboard; nothing
else is required at build time.

## SEO

- Per-page `<title>`/description via the Metadata API, with an
  Open Graph/Twitter image at `public/og-image.svg` (placeholder — see
  above).
- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt` from the same films data used by the pages, so they never
  drift out of sync.
- `ProfessionalService` JSON-LD structured data in the root layout.
