# Fakestore Dashboard

A modern e-commerce dashboard showcasing:

- Clean architecture and scalable code organization
- Comprehensive testing and error handling
- Dark/light mode and advanced filtering
- Leadership perspective on scaling and team practices

Built with: React, TypeScript, Vite, Tailwind CSS, Jest

## About This Project

This is a frontend dashboard application built as a technical assessment to demonstrate frontend leadership capabilities, scalable architecture, and production-ready code quality.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

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
