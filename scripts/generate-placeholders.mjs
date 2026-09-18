#!/usr/bin/env node
// Regenerates the editorial placeholder posters and team portraits.
// Run with: node scripts/generate-placeholders.mjs
// Replace the files this writes with real media as it becomes available —
// see README.md "Replacing placeholders".

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(rootDir, "..", "public");

const INK = "#0E0C0B";
const CHARCOAL = "#1C1917";
const IVORY = "#F4EEE3";
const STEEL = "#8B8983";
const ORANGE = "#C1512D";

const films = [
  { slug: "purinstinct-games", title: "PürInstinct Games", category: "Official trailer" },
  { slug: "purinstinct-x-manmade", title: "PürInstinct × Manmade", category: "Branded short film" },
  { slug: "learn-purinstinct", title: "Learn PürInstinct", category: "Explainer" },
  { slug: "purinstinct-festival", title: "PürInstinct Festival", category: "Event film" },
  { slug: "instinct-en", title: "INSTINCT (EN)", category: "AI concept film" },
  { slug: "instinct-fr", title: "INSTINCT (FR)", category: "AI concept film" },
  { slug: "purinstinct-pilot", title: "PürInstinct Pilot", category: "Pilot film" },
  { slug: "purinstinct-session", title: "PürInstinct Session", category: "Session film" },
  { slug: "un-sport-pur", title: "Un Sport Pur", category: "Teaser" },
  { slug: "festival-x-kaz", title: "Festival × Kaz", category: "Festival capsule" },
];

const team = [
  { slug: "dominique-soucy", name: "Dominique Soucy", title: "Sports Artist, Inventor and Founder" },
  { slug: "stefan-szary", name: "Stefan Szary", title: "Visual Director and Story Architect" },
  { slug: "neil-frisby", name: "Neil Frisby", title: "Immersive Sports Director and Creative Translator" },
  { slug: "youri-hainz", name: "Youri Hainz", title: "Art Director in Residence" },
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function posterSvg({ title, category }) {
  const w = 1600;
  const h = 900;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeXml(
    title
  )} — poster placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${CHARCOAL}"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <g opacity="0.4" stroke="${STEEL}" stroke-width="1">
    ${Array.from({ length: 6 })
      .map((_, i) => {
        const x = 200 + i * 240;
        return `<line x1="${x}" y1="0" x2="${x - 260}" y2="${h}"/>`;
      })
      .join("\n    ")}
  </g>
  <rect x="64" y="64" width="56" height="4" fill="${ORANGE}"/>
  <text x="${w - 64}" y="${h - 56}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="3" fill="${STEEL}">PLACEHOLDER POSTER</text>
</svg>`;
}

function portraitSvg({ name }) {
  const w = 900;
  const h = 1125;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeXml(
    name
  )} — portrait placeholder">
  <rect width="${w}" height="${h}" fill="${INK}"/>
  <rect x="0" y="0" width="${w}" height="${h}" fill="${CHARCOAL}" opacity="0.6"/>
  <circle cx="${w / 2}" cy="${h / 2 - 20}" r="180" fill="none" stroke="${STEEL}" stroke-width="2" opacity="0.6"/>
  <text x="${w / 2}" y="${h / 2 + 10}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="120" fill="${IVORY}">${escapeXml(
    initials
  )}</text>
  <rect x="${w / 2 - 28}" y="${h - 90}" width="56" height="3" fill="${ORANGE}"/>
  <text x="${w / 2}" y="${h - 48}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="3" fill="${STEEL}">PORTRAIT PLACEHOLDER</text>
</svg>`;
}

const postersDir = path.join(publicDir, "media", "posters");
const teamDir = path.join(publicDir, "assets", "team");
mkdirSync(postersDir, { recursive: true });
mkdirSync(teamDir, { recursive: true });

for (const film of films) {
  writeFileSync(path.join(postersDir, `${film.slug}.svg`), posterSvg(film));
}

for (const member of team) {
  writeFileSync(path.join(teamDir, `${member.slug}-placeholder.svg`), portraitSvg(member));
}

console.log(`Wrote ${films.length} poster placeholders and ${team.length} portrait placeholders.`);
