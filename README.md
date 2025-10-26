# Fakestore Dashboard

A modern e-commerce dashboard showcasing:

- Clean architecture and scalable code organization
- Comprehensive testing and error handling
- Dark/light mode and advanced filtering
- Leadership perspective on scaling and team practices

Built with: React, TypeScript, Vite, Tailwind CSS, Jest

## About This Project

This is a frontend dashboard application built as a technical assessment to demonstrate frontend leadership capabilities, scalable architecture, and production-ready code quality.

## Setup Instructions

Prerequisites:

- Node.js (LTS) and Yarn installed

Quick start:

```bash
yarn install
yarn dev        # Start dev server (Vite)
```

Build & test:

```bash
yarn build       # Build for production (includes type check)
yarn test:ci     # Run tests once (CI mode)
yarn preview     # Preview production build
```

Notes:

- The project uses TypeScript and Vite. Build runs include a type check step to catch type errors early.
- If you use npm instead of Yarn, substitute `npm install` and `npm run <script>` accordingly.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Technical Choices

- React + TypeScript: Type safety and wide ecosystem support make this a good fit for robust frontends.
- Vite: Fast dev server and optimized production builds.
- Tailwind CSS: Utility-first styling for rapid UI iteration and consistent design.
- Vitest + React Testing Library: Lightweight, fast tests with a focus on component behavior.
  Vitest ui is very useful to track and analyze test results while most of the syntax is similar to jest.
- Context + small reusable components: Context is used to manage state for filter and theming features.
  Theme state update is expected to re-render entire app with updated theme preference, so context is better choice here.
  The changes in filters will update the product list so re-render is expected here as well hence context fits this scenario.
  **Debouncing and pagination or virtualization** can be used to optimize the performance and user experience further.

Why these choices:

- Speed of iteration (Vite + React) and developer ergonomics were prioritized.
- Tailwind reduces CSS overhead and keeps styles co-located with components.
- The testing stack focuses on fast feedback and maintainable component tests.

## Development

### Available Scripts

```bash
yarn dev          # Start dev server
yarn build        # Build for production (includes type check)
yarn lint         # Run ESLint
yarn test         # Run tests in watch mode
yarn test:ci      # Run tests once
yarn preview      # Preview production build
```

### Pre-Push Checklist

Before pushing code, ensure:

```bash
yarn lint         # ✅ No linting errors
yarn build        # ✅ TypeScript compiles & builds successfully
yarn test:ci      # ✅ All tests pass
```

## CI/CD

### GitHub Actions

- This repository includes GitHub Actions workflows (see `.github/workflows/`) that run the CI pipeline.
- Runs on every PR to `main`
- Checks: Lint → Build (+ Type Check) → Tests
- Branch protection ensures quality

### For Larger Teams

With 3-5 engineers, I would add:

- **Husky + lint-staged**: Run checks on staged files only
- **Commitlint**: Enforce conventional commits
- **Coverage thresholds**: Maintain 80%+ test coverage
- **Automated dependency updates**: Dependabot
- **Pre-commit hooks**: Catch issues before CI

## AI Usage Documentation

This project used AI assistance for some non-sensitive, non-production tasks such as:

- Drafting the initial project plan and README sections
- Helping structure smaller components and tests during prototyping

How AI outputs were validated:

- I reviewed and edited all AI-generated code or text.
- Unit tests and type checking were used to catch issues.

## Trade-offs

- Simplicity vs completeness: The code favors readable, maintainable patterns over hyper-optimized micro-optimizations.
- Technology choices (Tailwind, Vite) favor developer DX and iteration speed; for projects with strict CSS architecture needs you might prefer a component library or stricter CSS boundaries.
- Testing: The project includes focused component tests.

## Leadership / Scaling Notes

### Scaling — how I would structure and organize the project

- For Repository and module layout, I recommend to:

  - Keep a single repo and organize features as vertical modules under `src/features/` (for example `products/`, `product-filter/`, `theme/`). Each feature exposes a small public surface: components, hooks, and `types`.
  - Place shared UI primitives in `src/components/` and reusable utilities in `src/lib/` (api clients, formatters, helpers).
  - Keep feature-specific types colocated, and export commonly used types from `src/types/` to avoid duplication.

- Public contracts and documentation:

  - Each feature should export a minimal public API and include a short README describing props, hooks, side effects, and error modes.
  - Rely on TypeScript types as the primary contract and prefer explicit props over implicit globals.

- For Performance and UX, I like to:

  - Use pagination or virtualization (e.g., react-window) for long lists and debounce filter inputs. Keep expensive computations in hooks and memoize where appropriate.
  - Define lightweight performance budgets (bundle size targets, render time goals) and monitor regressions.

- For Developer experience, I would:
  - Standardize local setup (scripts, `.env.example`) and provide a small seed/mock server for offline work when the API is rate-limited.
  - Maintain a CONTRIBUTING.md with branch naming, PR size guidance, and testing expectations.

### Team Practices — code reviews, CI/CD, and ensuring code quality

- Code reviews:

  - I would require at least one reviewer for every PR (two for high-risk changes). Reviews focus on behavior, tests, typing, accessibility, and clarity.
  - I would use a PR template with a short checklist: purpose, screenshots/recordings, test plan, files changed, and known limitations.
  - I like to encourage small PRs and prefer iterative, incremental changes over large refactors in a single PR. For disagreements, we discuss on the PR or pair briefly to reach consensus.

- CI/CD:

  - The CI pipeline runs on every PR and enforces: install → lint → type-check → unit tests → build. On `main`, I run additional checks like coverage and slower integrations.
  - Workflows live in `.github/workflows/` and branch protection gates merges until CI passes.
  - I generate preview builds for PRs and deploy to production only from `main` after a green pipeline.

- For quality gates and automation, I would:

  - Enforce ESLint and TypeScript rules in CI. Use Husky + lint-staged to catch simple issues before push.
  - Require unit tests for business logic and at least one RTL test for critical UI flows. Introduce coverage thresholds gradually.
  - Prefer automatic fixes for formatting (Prettier) while requiring human review for behavioral changes.

These practices let the team move quickly while keeping stable public contracts, and reliable CI enforcement.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
