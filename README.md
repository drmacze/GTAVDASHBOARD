# GTAVDASHBOARD

Standalone admin dashboard for the GTA V native iOS community project.

## Architecture

- Static dashboard UI: `index.html`, `styles.css`, `app.js`
- API bridge: `api-bridge.js`
- Existing data/backend remains in `GTAVSITE` at `https://playgta5-1k8.pages.dev`
- GitHub Pages hosts the dashboard separately at `https://drmacze.github.io/GTAVDASHBOARD/`
- Admin authentication continues to use the existing `X-Admin-Token` flow. The token is stored in `sessionStorage` only.
- `GTAVSITE/functions/api/_middleware.js` permits the standalone dashboard origin and handles CORS preflight for admin API calls.

## Features

- Overview KPI cards and Franklin activity chart
- Device mix and top-question topics
- Franklin session analytics
- Release publisher / editor / delete
- Mods manager with Gallery/Photos multi-upload
- Automatic 1-photo static thumbnail / 2+ photo slider behavior
- Feedback & Issues inbox
- Responsive mobile navigation

## Deployment

GitHub Actions deploys the dashboard to GitHub Pages from `main` using `.github/workflows/pages.yml`.

The dashboard reads and writes project data through the existing backend at:

`https://playgta5-1k8.pages.dev/api/*`

The previous Cloudflare Pages Function proxy remains in the repository for a future Cloudflare-hosted dashboard, but GitHub Pages uses `api-bridge.js` directly.
