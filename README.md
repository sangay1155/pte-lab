# PTELab — PTE Academic Practice Interface

This project is a high-fidelity single-page React + TypeScript + Vite app that simulates key parts of the Pearson PTE Academic exam UI for practice and prototyping.

Features
- Strongly-typed PTE question models (`src/types/pte.ts`).
- Speaking audio recording with a 3-second silence auto-stop rule (`src/hooks/usePTEAudioRecorder.ts`).
- Responsive exam layout, question tracker, Practice mode with answer checking (`src/components/ExamLayout.tsx`).
- Interactive Speaking / Reading / Listening panels.

Run locally
```
cd ptea-platform
npm install
npm run dev
```

Build
```
cd ptea-platform
npm run build
```

Notes
- Answers are persisted to `localStorage` for quick local practice sessions. Audio recordings are available during the session for playback in Practice Mode.
- This is a developer prototype and not affiliated with Pearson. Do not use for cheating or misuse.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
