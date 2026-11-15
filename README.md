# Yacht Website — Pink Lady Yachting Services

Professional service website for a yacht support company operating in Thailand (Phuket, Krabi, Koh Samui).

## Tech Stack

| Tool         | Version | Purpose                                                                       |
| ------------ | ------- | ----------------------------------------------------------------------------- |
| Vite         | 8       | Build tool and dev server (SPA)                                               |
| React        | 19.3    | UI layer                                                                      |
| TypeScript   | 6       | Type safety                                                                   |
| Tailwind CSS | 4       | Utility-first styling                                                         |
| CSS motion   | -       | Scroll-driven reveals, route line, view transitions (no JS animation library) |
| Fontsource   | 5       | Self-hosted Barlow Condensed + Plus Jakarta Sans (latin, latin-ext)           |
| Lucide React | 0.487   | Icons                                                                         |
| Playwright   | 1.65    | End-to-end tests                                                              |
| Vitest       | 5       | Unit tests                                                                    |
| Lighthouse   | 12      | Performance baseline                                                          |

## Architecture

High-level structure, key systems, and architectural decisions live in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Development Setup

```bash
pnpm install
pnpm run dev                  # http://localhost:3000
```

## Commands

- `pnpm run dev` starts the local development server.
- `pnpm run lint` runs ESLint.
- `pnpm run typecheck` runs TypeScript.
- `pnpm run test:unit` runs Vitest unit tests.
- `pnpm run test:e2e` runs the Playwright end-to-end suite.
- `pnpm run perf:lighthouse` runs local desktop and mobile Lighthouse audits.

For the full script list, see `package.json`.

## Testing

Two Playwright projects: `desktop-chrome`, `mobile-safari`.
Tests run against a production preview build on port 3103 to avoid port conflicts.

## Production

Production URL: [https://pinkladyyachtingservices.com](https://pinkladyyachtingservices.com)  
Current deployment target: Vercel

**Author**: Lowcash  
**License**: MIT
