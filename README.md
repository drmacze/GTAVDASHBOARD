# GTAVDASHBOARD

Standalone admin dashboard for the GTA V native iOS community project.

## Architecture

- Static dashboard UI: `index.html`, `styles.css`, `app.js`
- Cloudflare Pages Function proxy: `functions/api/[[path]].js`
- Existing data/backend remains in `GTAVSITE` at `https://playgta5-1k8.pages.dev`
- The browser talks only to this dashboard's `/api/*` paths; the Pages Function forwards requests to the existing project API.
- Admin authentication continues to use the existing `X-Admin-Token` flow. The token is stored in `sessionStorage` only.

## Features

- Overview KPI cards and Franklin activity chart
- Device mix and top-question topics
- Franklin session analytics
- Release publisher / editor / delete
- Mods manager with Gallery/Photos multi-upload
- Automatic 1-photo static thumbnail / 2+ photo slider behavior
- Feedback & Issues inbox
- Responsive mobile navigation

## Cloudflare Pages

Create a separate Pages project from this repository.

Recommended settings:

- Framework preset: None
- Build command: leave empty
- Build output directory: `/`
- Functions are detected automatically from the `functions` directory.

The dashboard API proxy currently targets:

`https://playgta5-1k8.pages.dev`

If the public project's origin changes, update `ORIGIN` in `functions/api/[[path]].js`.
