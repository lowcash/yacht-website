# Project Architecture

## Overview

Yacht Website is a Vite-based single-page marketing site focused on section navigation, motion-led presentation, and always-visible conversion controls.

## Project Structure

```
src/
├── components/
│   ├── features/               # Hero, About, Services, Contact
│   ├── layout/                 # Header and side-dot navigation
│   ├── shared/                 # Floating controls, section helpers, context
│   └── ui/                     # Reusable styled primitives
├── lib/                        # Section navigation helpers and adapters
├── App.tsx                     # Root composition and section order
└── main.tsx                    # SPA entry point
```

## Key Systems

### 1. Section Navigation

**Implementation**: `src/components/layout/Navigation.tsx`, `src/components/layout/SideDotsNavigation.tsx`, `src/lib/navigation-core-adapter.ts`

Header links, side dots, and scroll state share one section model through local navigation helpers and active-section context. That keeps anchor scrolling and active highlighting consistent across desktop and mobile navigation surfaces.

### 2. Motion-Led Presentation

**Implementation**: `src/components/features/Hero.tsx`, `src/components/shared/SectionDivider.tsx`

Framer Motion drives hero, section divider, and CTA reveals as part of the content hierarchy rather than as decoration added afterward. Reduced-motion preferences are respected at component level.

### 3. Floating Action Controls

**Implementation**: `src/components/shared/ScrollToTop.tsx`, `src/components/shared/WhatsAppButton.tsx`

Persistent floating controls live in a shared fixed wrapper so contact and return-to-top actions stay available without fighting the main layout. The `pointer-events-none` container with a centered inner wrapper keeps positioning stable across breakpoints.

## Tech Stack Decisions

- **Vite SPA** keeps runtime and deployment simple for a brochure site with no server-side mutation or auth surface.
- **Shared section-navigation helpers** keep header links, side dots, and scroll state aligned around one section model.
- **Framer Motion with reduced-motion handling** supports motion-heavy presentation without dropping accessibility.
- **Tailwind CSS** keeps responsive layout and floating-control positioning close to the components that own them.
