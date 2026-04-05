---
applyTo: 'src/**/*.{ts,tsx},vite.config.ts,index.html'
---

# Vite SPA Implementation

This is a client-side single-page application built with Vite. There are no server components, server actions, or server-side rendering.

## SPA Boundaries

- All code runs in the browser. Do not import Node.js-only APIs.
- `App.tsx` is the root; it composes all routes/sections and mounts providers.
- For large sections consider lazy loading with `React.lazy` + `Suspense` to keep initial bundle small.

## Environment Variables

- All env vars exposed to the browser **must** use the `VITE_` prefix, e.g. `VITE_ANALYTICS_ID`.
- Read them as `import.meta.env.VITE_*` (never `process.env.*`).
- Commit `.env.example` with all keys documented; never commit `.env`.

## Static Assets

| Location | When to use |
|----------|-------------|
| `public/` | Files that need a stable public URL at the same path (favicons, `robots.txt`, `sitemap.xml`) |
| `src/assets/` | Images, fonts, icons imported directly in components — Vite processes them through the build pipeline |

- Import images as ES modules: `import logo from '@/assets/logo.png'`
- Do not reference `src/assets/` by URL path — use imports.

## Build and Preview

- Always run `npm run build` + `npm run preview` (production mode) before benchmarking performance.
- Do not profile or diagnose issues against `npm run dev` — Vite dev mode skips optimizations.

## Performance Guardrails

- Avoid importing large libraries that are only used in one section without lazy loading.
- Respect `prefers-reduced-motion`; gate Framer Motion animations behind this check.
- Use `requestAnimationFrame` or `IntersectionObserver` for scroll-driven effects.
- Avoid duplicate event listeners — clean up in `useEffect` return.
