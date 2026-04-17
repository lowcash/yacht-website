# Copilot Instructions

Use this repository's `.github` customization stack as the primary active guidance layer.

## Tech Stack

Current versions in use (update line items as your project upgrades):

- **Framework**: Vite 6+ (SPA)
- **UI Framework**: React 18+
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Animations**: Framer Motion
- **Testing**: Playwright E2E (see Fáze 6 of polish plan)

**Note**: Update version references in this file and `.github/instructions/vite-spa.instructions.md` when major versions change.

## Foundational Guidance

- `.github/instructions/vite-spa.instructions.md` - Vite SPA rules: bundling, env vars, assets, lazy loading
- `.github/instructions/architecture.instructions.md` - Stack-agnostic component layering, state boundaries, styling ownership
- `.github/instructions/clean-code.instructions.md` - Refactoring discipline, suppression rules, dead-code removal
- `.github/instructions/imports.instructions.md` - Alias and import ownership policy

## Repository Notes

- This is a client-side SPA. There are no server components, server actions, or route handlers.
- Environment variables must use the `VITE_` prefix (not `NEXT_PUBLIC_`).
- Framer Motion (`motion/react`) is used for animations; honour `prefers-reduced-motion`.
- Floating buttons (ScrollToTop, WhatsAppButton) use `pointer-events-none` container + `max-w-6xl` inner wrapper — do not revert to direct `fixed left/right-*` positioning.
- This is intentionally a lean SPA instruction stack. Do not import Next.js or fullstack data-persistence guidance into this repository.
