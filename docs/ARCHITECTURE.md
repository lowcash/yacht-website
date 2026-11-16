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

The page scrolls on the document (no inner scroller, no scroll snapping). Only the hero is viewport-tall; Services, About and Contact stack at content height with `--section-y` (clamp 4rem to 8rem) vertical padding, and the rail ports are computed from the real section offsets. The rail line progress is JS-driven (`computeRailProgress`): piecewise-linear through the scroll positions at which each section becomes active, so it is 0 on the hero and reaches a port exactly when that port lights up. Header links, route rail, hero CTAs and the mobile menu are real `<a href="#id">` anchors; with JS they go through `navigateToSection` (View Transition crossfade, smooth `scrollIntoView` fallback, instant jump under reduced motion). One section-ID source (`SECTION_IDS` / `NAV_SECTIONS`) and one active-section context.

### 2. Motion (CSS only, minimalist)

**Implementation**: `src/index.css`, `RouteProgressFallback.tsx`

Reveals use `animation-timeline: view()`, the header route bar uses `animation-timeline: scroll(root)` (the desktop rail line is JS-driven, see Section Navigation) with a registered `@property --p`; both sit behind `@supports` and `prefers-reduced-motion: no-preference` (content is visible and the route bar fully drawn otherwise). The only other motion is quiet colour hover states; the only motion besides reveals is the slow service-strip marquee (60 s loop, eased to a crawl on hover, static wrapped list under reduced motion); there is no wave texture or lift/scale hover; blur is used only for the scrolled header glass and the dialog backdrop. Service cards are static (no reveal). Reveal is opacity plus a 12px rise. A small rAF listener sets `--p` only where scroll timelines are unsupported. The hero (LCP h1) is never animated.

### 3. Hero video

**Implementation**: `src/components/features/Hero.tsx`, `public/video/`, `public/poster.{avif,webp}`

The LCP element is the poster `<img fetchpriority="high">` (AVIF/WebP) rendered in the prerendered HTML. After mount, a muted looping `<video>` (720p MP4 below 768px, then WebM, then 1080p MP4) is added unless `prefers-reduced-motion` or `navigator.connection.saveData` is set; it fades in on `playing` and plays at 0.88x speed. The loop is four Pixabay clips in five cuts (golden-hour superyacht at anchor, luxury motor yacht underway in a stable aerial with bow wake in a wide and a cropped cut, drone approach to a sailing yacht, Phuket bay), 18 s with 0.5 s cross-fades and a seamless seam, one common grade, no people in focus or text. A light, left-weighted navy scrim plus a text shadow keeps h1/CTA contrast above AA while the footage stays vivid. All clips are under the Pixabay Content License (commercial use, no attribution); sources, authors, licence labels and rejected clips are in `docs/video-credits.md`.

### 4. Services and service enquiries

**Implementation**: `Services.tsx`, `ServiceInquiryContext.tsx`, `Contact.tsx`

Eight fixed-layout, static cards from `SERVICES` in a grid (number and icon tile on top, title, summary, and a "Details" row with a "+" icon pinned right at the card foot). The whole card is the click target (cursor pointer): the "Details" button is the only focusable control and stretches over the card with `::after`, so there are no nested interactive elements and the focus ring is drawn on the card. It opens that card's native modal `<dialog>` (`showModal()`: top layer, focus trap, Escape and backdrop click close, focus returns to the button), so nothing in the page reflows (CLS 0); the backdrop is blurred (`backdrop-filter`). Icons are one lucide set at stroke 1.75 (24 grid), service icons in identical 2.75rem tiles. The dialog has an "Ask about this service" link to `#contact`; it stores the service title in `ServiceInquiryProvider` (also seeded from `?service=<id>`). Contact shows "Enquiring about: ..." (clearable) and adds the service to the WhatsApp text and the mailto subject. Between hero and services a pink `ServiceStrip` marquee lists the services.

### 5. Floating Action Controls

**Implementation**: `src/components/shared/ScrollToTop.tsx`, `src/components/shared/WhatsAppButton.tsx`

One fixed bottom-right stack (`.float-actions`): scroll-to-top above WhatsApp, both 3.25rem circles on one vertical axis with a 0.75rem gap. Below 768px `FloatingActions` hides the stack while scrolling down (8px threshold) and shows it on scroll up or within 120px of the top or bottom; it also stays shown while focused. Desktop is always visible; reduced motion removes the transition. The header (56px, uppercase tracked links, outlined pink Contact pill) is transparent over the hero with a soft top veil and turns into 86% navy blurred glass without a border (`data-scrolled`, also while the mobile menu is open); the mobile menu panel is solid `navy-deep`. Brand pink is `oklch(0.79 0.185 352)` on dark surfaces, `pink-ink` on light ones.

## Tech Stack Decisions

- **Vite SPA** keeps runtime and deployment simple for a brochure site with no server-side mutation or auth surface. Build-time prerender (`scripts/prerender.mjs`, SSR build of the real `App`) writes the full static page into `dist/index.html`.
- **Shared section-navigation helpers** keep header links, the route rail, and scroll state aligned around one section model.
- **CSS-only motion** (scroll-driven animations, view transitions) with reduced-motion fallbacks keeps client JS minimal.
- **Tailwind CSS 4** (`@tailwindcss/vite`) keeps responsive layout close to the components that own them.
