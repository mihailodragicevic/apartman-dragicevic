# Apartman Dragićević

Vite + React/TypeScript website for Apartman Dragićević.

## Development

- `npm run dev` starts the local development server.
- `npm run build` creates the production build in `dist/` and prerenders the pages.
- `npm run preview` serves the production build locally.
- `npm run verify:geo` rebuilds the site and validates the prerendered Serbian (`/`) and English (`/en/`) pages, metadata, structured data, facts, images, robots.txt, sitemap.xml, and Vercel configuration.

The Serbian page is canonical at `/`; the English version is at `/en/`. Both URLs use a trailing slash policy configured in `vercel.json`.
