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

**Implementation**: `ActiveSectionProvider` (single `<main>` scroll listener), `Navigation.tsx` / `SideDotsNavigation.tsx`, `src/lib/navigation-core-adapter.ts`, `packages/navigation-core`

Header links, side dots, and scroll state share one section-ID source (`SECTION_IDS` / `NAV_SECTIONS` in `constants.ts`) and one active-section context.

### 2. Motion-Led Presentation

**Implementation**: `MotionProvider` (`LazyMotion` + `MotionConfig`), `Hero.tsx`, `SectionDivider.tsx`

Motion uses `m.*` components under `LazyMotion`. A global CSS guard and `prefers-reduced-motion` checks gate infinite animations. Hero parallax reads scroll from the `<main>` scroller via `MainScrollContext`.

### 3. Floating Action Controls

**Implementation**: `src/components/shared/ScrollToTop.tsx`, `src/components/shared/WhatsAppButton.tsx`

Persistent floating controls live in a shared fixed wrapper so contact and return-to-top actions stay available without fighting the main layout.

## Tech Stack Decisions

- **Vite SPA** keeps runtime and deployment simple for a brochure site with no server-side mutation or auth surface. Build-time prerender (`scripts/prerender.mjs`) writes static section HTML into `dist/index.html` for crawlers.
- **Shared section-navigation helpers** keep header links, side dots, and scroll state aligned around one section model.
- **Motion with reduced-motion handling** supports motion-heavy presentation without dropping accessibility.
- **Tailwind CSS 4** (`@tailwindcss/vite`) keeps responsive layout close to the components that own them.
