# Project Architecture

## Overview

This project is a single-page React application built with Vite, serving as a professional brochure site for yachting services. It emphasizes visual hierarchy, responsiveness, and clear calls-to-action.

## Directory Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # React components
│   ├── ui/          # Base UI elements
│   └── [Feature].tsx # Feature-specific components (Hero, Services, etc.)
├── lib/             # Utilities and constants
├── styles/          # Global styles
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

## Key Systems

### 1. Navigation

**Implementation**: `Navigation.tsx`

Sticky header with smooth scroll-to-anchor behavior. Mobile: hamburger menu triggers slide-out drawer. Keyboard-accessible (Escape to close). Uses `react-scroll` for smooth anchor linking without full page reloads.

### 2. Scroll-Reveal Animations

**Implementation**: Framer Motion with Intersection Observer

Components animate on viewport visibility: `initial` → `whileInView` → `exit` states. Respects `prefers-reduced-motion` media query (animations disabled for users who prefer reduced motion). Hero section, feature cards, and CTA buttons use entrance animations to guide user attention.

### 3. Responsive Layout System

**Implementation**: Tailwind CSS breakpoints (mobile-first, CSS-first)

Mobile layout is the baseline; `md:` and `lg:` utilities scale up for tablet/desktop. Service grid adapts: 1 column mobile → 2 tablet → 3+ desktop. Floating buttons (WhatsApp, ScrollToTop) use `pointer-events-none` container + `max-w-6xl` inner wrapper to prevent layout shift.

## Tech Stack Decisions

- **Vite**: Fast build times and modern development experience.
- **React**: Component-based architecture for maintainability.
- **Tailwind CSS**: Rapid styling with built-in responsive modifiers.
- **Lucide React**: Consistent, lightweight icon set.
