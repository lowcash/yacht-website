---
applyTo: 'src/components/**/*.{ts,tsx},src/lib/**/*.{ts,tsx},src/styles/**/*.css'
---

# Architecture & Component Organization (Framework-Agnostic)

This document defines stack-agnostic architecture ownership for this repository and reusable web projects.
Use framework-specific instruction files (for example `vite-spa.instructions.md`) for runtime and bundler rules.

## Core Principles

### 1. **Component Layering**

Organize components into logical layers to prevent mixing concerns:

| Layer             | Unit                       | Purpose                                             | Constraints                                      |
| ----------------- | -------------------------- | --------------------------------------------------- | ------------------------------------------------ |
| **UI Layer**      | `src/components/ui/`       | Base styled components (buttons, cards, containers) | Zero business logic; pure presentation           |
| **Feature Layer** | `src/components/features/` | Content modules (sections, pages)                   | Compose UI primitives; no raw className styling  |
| **Shared Layer**  | `src/components/shared/`   | Cross-feature utilities and effects                 | May be stateful; avoid duplicating feature logic |
| **Layout Layer**  | `src/components/layout/`   | Structure wrappers and orchestration boundaries     | Pure composition; no feature-specific styling    |

**Rule**: Features compose UI primitives. Never define raw styling in features.

### 2. **State Boundaries**

Clear separation of state ownership:

| State Type           | Owner                                       | Example                           |
| -------------------- | ------------------------------------------- | --------------------------------- |
| **Engine state**     | Client root component (`App.tsx`)           | Current section, menu open/closed |
| **Local state**      | Feature component                           | Form input, dropdown toggled      |
| **Context state**    | React Context (e.g. `ActiveSectionContext`) | Scroll-tracked active section     |
| **Persistent state** | Browser storage                             | User preferences                  |

**Best Practice**: Centralize engine state in `App.tsx` or a Context Provider and pass state downward.

### 3. **Styling Strategy**

- **Global Styles**: `src/index.css` + `src/styles/globals.css`
- **Component Styles**: Utility-first (Tailwind), no ad-hoc raw class definitions in feature components
- **Dynamic Values**: CSS custom properties for runtime visuals instead of frequent React state updates
- **Responsive**: Mobile-first media query approach

### 4. **Naming & Refactoring**

- **Components**: PascalCase (`.tsx`)
- **Utilities**: camelCase (`.ts`)
- **Styles**: kebab-case (`.css`)
- **Hooks**: `use*` prefix
- **Migration-first**: update consumers, then remove old paths; no suppression-first shortcuts
