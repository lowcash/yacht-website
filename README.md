# Yacht Website — Pink Lady Yachting Services

Professional service website for a yacht support company operating in Thailand (Phuket, Krabi, Koh Samui).

## Tech Stack

| Tool          | Version | Purpose                             |
| ------------- | ------- | ----------------------------------- |
| Vite          | 6       | Build tool and dev server (SPA)     |
| React         | 18      | UI layer                            |
| TypeScript    | 5       | Type safety                         |
| Tailwind CSS  | 4       | Utility-first styling (precompiled) |
| Framer Motion | —       | Scroll-reveal and micro-animations  |
| Lucide React  | —       | Icons                               |
| Radix UI      | —       | Accessible headless primitives      |
| Playwright    | 1       | End-to-end tests                    |
| Lighthouse    | 12      | Performance baseline                |

## Project Structure

```
src/
  components/
    features/           # Page-section components (Hero, Services, About …)
    shared/             # Reusable components (ScrollToTop, WhatsAppButton …)
    ui/                 # Base UI primitives (shadcn/ui)
  lib/                  # Utilities and constants
  styles/               # Global styles
  assets/               # Static assets (images, icons)
  App.tsx               # Root component and section assembly
  main.tsx              # Entry point
index.html              # SPA shell with GA setup and structured data
tests/e2e/              # Playwright end-to-end tests
```

## Development Setup

```bash
cp .env.example .env.local   # fill in VITE_GA_TRACKING_ID (optional)
npm install
npm run dev                  # http://localhost:5173
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

### Google Analytics

Set `VITE_GA_TRACKING_ID` in Vercel (e.g. `G-XXXXXXXXXX`).
If the key is not set, GA scripts are not injected.

## Commands

| Command                            | Purpose                              |
| ---------------------------------- | ------------------------------------ |
| `npm run dev`                      | Start dev server (Vite, port 5173)   |
| `npm run build`                    | Production build                     |
| `npm run preview`                  | Serve production build locally       |
| `npm run lint`                     | ESLint                               |
| `npm run typecheck`                | TypeScript check                     |
| `npm run format`                   | Prettier                             |
| `npm run test:e2e`                 | Run all Playwright tests             |
| `npm run test:e2e:baseline`        | Smoke tests (CI subset)              |
| `npm run perf:lighthouse:baseline` | Build + Lighthouse + threshold check |

## Testing

Two Playwright projects: `desktop-chrome`, `mobile-safari`.
Tests run against a production preview build on port 3103 to avoid port conflicts.

```bash
npm run test:e2e
npm run test:e2e:ui   # interactive UI mode
```

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.
Live URL: [https://pinkladyyachtingservices.com](https://pinkladyyachtingservices.com)

---

**Author**: Lowcash  
**License**: MIT
