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

## Architecture

High-level structure, component organization, and design system notes live in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Development Setup

```bash
npm install
npm run dev                  # http://localhost:5173
```

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

## Production

Production URL: [https://pinkladyyachtingservices.com](https://pinkladyyachtingservices.com)  
Current deployment target: Vercel

---

**Author**: Lowcash  
**License**: MIT
