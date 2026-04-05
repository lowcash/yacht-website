---
applyTo: '**/*.{ts,tsx,js,jsx,mjs}'
---

This file owns import path policy for the repository.

- Prefer alias-based absolute imports over deep relative chains.
- Use `@/*` for application code that lives under `src/` (maps to `./src/*` in tsconfig and vite.config.ts).
- Prefer same-folder `./` imports only for tightly local siblings.
- Avoid `../..` chains when an alias import can express ownership more clearly.
- Keep aliases aligned with `tsconfig.app.json` path mappings AND `vite.config.ts` resolve.alias. When reorganising the project structure, update all three together.
