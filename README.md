# Yacht Website — Pink Lady Yachting Services

Professional service website for a yacht support company operating in Thailand (Phuket, Krabi, Koh Samui).

## Tech Stack

| Tool          | Version | Purpose                             |
| ------------- | ------- | ----------------------------------- |
| Vite          | 6       | Build tool and dev server (SPA)     |
| React         | 18      | UI layer                            |
| TypeScript    | 5       | Type safety                         |
| Tailwind CSS  | 4       | Utility-first styling (precompiled) |
| Framer Motion | 12.23   | Scroll-reveal and micro-animations  |
| Lucide React  | 0.487   | Icons                               |
| Playwright    | 1       | End-to-end tests                    |
| Lighthouse    | 12      | Performance baseline                |

## Architecture

High-level structure, key systems, and architectural decisions live in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Development Setup

```bash
npm install
npm run dev                  # http://localhost:5173
```

## Commands

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint.
- `npm run test:e2e` runs the Playwright end-to-end suite.
- `npm run perf:lighthouse` runs local desktop and mobile Lighthouse audits.

For the full script list, see `package.json`.

## Testing

Two Playwright projects: `desktop-chrome`, `mobile-safari`.
Tests run against a production preview build on port 3103 to avoid port conflicts.

## Production

Production URL: [https://pinkladyyachtingservices.com](https://pinkladyyachtingservices.com)  
Current deployment target: Vercel

**Author**: Lowcash  
**License**: MIT
