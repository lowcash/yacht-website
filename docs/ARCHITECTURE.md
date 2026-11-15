# Project Architecture

## Overview

Yacht Website is a Vite-based single-page marketing site focused on section navigation, motion-led presentation, and always-visible conversion controls.

## Project Structure

```
src/
├── components/
│   ├── features/               # Hero, About, Services, Contact
│   ├── layout/                 # Header, mobile menu, side-dot navigation
│   ├── shared/                 # Floating controls, section helpers, context
│   └── ui/                     # Reusable styled primitives
├── hooks/                      # Shared hooks (reduced motion, scroll accessors)
├── lib/                        # Section navigation helpers and company constants
├── App.tsx                     # Root composition and section order
└── main.tsx                    # SPA entry point
```

## Key Systems

### 1. Section Navigation

**Implementation**: `ActiveSectionProvider` (rAF-throttled window scroll listener), `Navigation.tsx`, `RouteRail.tsx`, `SectionLink.tsx`, `HashSync.tsx`, `src/lib/navigation-core-adapter.ts`, `packages/navigation-core`

The page scrolls on the document (no inner scroller). Header links, route rail, hero CTAs and the mobile menu are real `<a href="#id">` anchors; with JS they go through `navigateToSection` (View Transition crossfade, smooth `scrollIntoView` fallback, instant jump under reduced motion). One section-ID source (`SECTION_IDS` / `NAV_SECTIONS`) and one active-section context.

### 2. Motion (CSS only)

**Implementation**: `src/index.css`, `RouteProgressFallback.tsx`

Reveals use `animation-timeline: view()`, the route line/bar use `animation-timeline: scroll(root)` with a registered `@property --p`; both sit behind `@supports` and `prefers-reduced-motion: no-preference` (content is visible and the route fully drawn otherwise). The marquee is a CSS transform loop that becomes a static wrapped list under reduced motion. A small rAF listener sets `--p` only where scroll timelines are unsupported. The hero (LCP h1) is never animated.

### 3. Floating Action Controls

**Implementation**: `src/components/shared/ScrollToTop.tsx`, `src/components/shared/WhatsAppButton.tsx`

Persistent floating controls live in a shared fixed wrapper so contact and return-to-top actions stay available without fighting the main layout.

## Tech Stack Decisions

- **Vite SPA** keeps runtime and deployment simple for a brochure site with no server-side mutation or auth surface. Build-time prerender (`scripts/prerender.mjs`, SSR build of the real `App`) writes the full static page into `dist/index.html`.
- **Shared section-navigation helpers** keep header links, side dots, and scroll state aligned around one section model.
- **CSS-only motion** (scroll-driven animations, view transitions) with reduced-motion fallbacks keeps client JS minimal.
- **Tailwind CSS 4** (`@tailwindcss/vite`) keeps responsive layout close to the components that own them.
