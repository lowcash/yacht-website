# Project Architecture

## Overview

Yacht Website is a Vite-based single-page marketing site focused on section navigation, motion-led presentation, and always-visible conversion controls.

## Project Structure

```
src/
├── components/
│   ├── features/               # Hero, About, Services, Contact
│   ├── layout/                 # Header, mobile menu, drawn route rail
│   ├── shared/                 # Floating controls, section helpers, context
│   └── ui/                     # Reusable styled primitives
├── hooks/                      # Shared hooks
├── lib/                        # Section navigation helpers and company constants
├── App.tsx                     # Root composition and section order
└── main.tsx                    # SPA entry point
```

## Key Systems

### 1. Section Navigation

**Implementation**: `ActiveSectionProvider` (rAF-throttled window scroll listener), `Navigation.tsx`, `RouteRail.tsx`, `SectionLink.tsx`, `HashSync.tsx`, `src/lib/navigation-core-adapter.ts`, `packages/navigation-core`

The page scrolls on the document (no inner scroller, no scroll snapping). Only the hero is viewport-tall; Services, About and Contact stack at content height with `--section-y` (clamp 4rem to 8rem) vertical padding, and the rail ports are computed from the real section offsets. Header links, route rail, hero CTAs and the mobile menu are real `<a href="#id">` anchors; with JS they go through `navigateToSection` (View Transition crossfade, smooth `scrollIntoView` fallback, instant jump under reduced motion). One section-ID source (`SECTION_IDS` / `NAV_SECTIONS`) and one active-section context.

### 2. Motion (CSS only, minimalist)

**Implementation**: `src/index.css`, `RouteProgressFallback.tsx`

Reveals use `animation-timeline: view()`, the route line/bar use `animation-timeline: scroll(root)` with a registered `@property --p`; both sit behind `@supports` and `prefers-reduced-motion: no-preference` (content is visible and the route fully drawn otherwise). The only other motion is quiet colour hover states; there is no marquee, wave texture, lift/scale hover or blur. Reveal is opacity plus a 12px rise. A small rAF listener sets `--p` only where scroll timelines are unsupported. The hero (LCP h1) is never animated.

### 3. Hero video

**Implementation**: `src/components/features/Hero.tsx`, `public/video/`, `public/poster.{avif,webp}`

The LCP element is the poster `<img fetchpriority="high">` (AVIF/WebP) rendered in the prerendered HTML. After mount, a muted looping `<video>` (720p MP4 below 768px, then WebM, then 1080p MP4) is added unless `prefers-reduced-motion` or `navigator.connection.saveData` is set; it fades in on `playing`. The loop is six exterior shots, wide to close (marina, two aerial sail passes, sunset sail, bow and deck, hull and wake; no interiors), about 20 s, graded teal/warm. A light, left-weighted navy scrim plus a text shadow keeps h1/CTA contrast above AA while the footage stays vivid. Every clip is Pexels (commercial use, no attribution); sources, licences and rejected clips are in `docs/video-credits.md`.

### 4. Services and service enquiries

**Implementation**: `Services.tsx`, `ServiceInquiryContext.tsx`, `Contact.tsx`

Eight fixed-layout cards from `SERVICES` in a grid (number and icon on top, title, summary, and a "Details" row with a "+" icon pinned right at the card foot, so the icon sits in the same place in every card). "Details" opens that card's native modal `<dialog>` (`showModal()`: top layer, focus trap, Escape and backdrop click close, focus returns to the button), so nothing in the page reflows (CLS 0). The dialog has an "Ask about this service" link to `#contact`; it stores the service title in `ServiceInquiryProvider` (also seeded from `?service=<id>`). Contact shows "Enquiring about: ..." (clearable) and adds the service to the WhatsApp text and the mailto subject. Between hero and services a static pink `ServiceStrip` lists the services.

### 5. Floating Action Controls

**Implementation**: `src/components/shared/ScrollToTop.tsx`, `src/components/shared/WhatsAppButton.tsx`

One fixed bottom-right stack (`.float-actions`): scroll-to-top above WhatsApp, both 3.25rem circles on one vertical axis with a 0.75rem gap. Below 768px `FloatingActions` hides the stack while scrolling down (8px threshold) and shows it on scroll up or within 120px of the top or bottom; it also stays shown while focused. Desktop is always visible; reduced motion removes the transition. The header (60px, 1px hairline, short pink active-link bar) and mobile menu are solid `navy-deep` (no translucency or blur). Brand pink is `oklch(0.79 0.185 352)` on dark surfaces, `pink-ink` on light ones.

## Tech Stack Decisions

- **Vite SPA** keeps runtime and deployment simple for a brochure site with no server-side mutation or auth surface. Build-time prerender (`scripts/prerender.mjs`, SSR build of the real `App`) writes the full static page into `dist/index.html`.
- **Shared section-navigation helpers** keep header links, the route rail, and scroll state aligned around one section model.
- **CSS-only motion** (scroll-driven animations, view transitions) with reduced-motion fallbacks keeps client JS minimal.
- **Tailwind CSS 4** (`@tailwindcss/vite`) keeps responsive layout close to the components that own them.
