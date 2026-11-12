# 001 — Styling approach: layered design tokens with themes

Date: 2026-11-12 · Status: accepted

## Context

Components need consistent colors, spacing and typography, plus light and dark themes. Raw hex values in components make theming and global changes expensive.

## Decision

1. **Two token layers** in `packages/tokens` (DTCG JSON, built with Style Dictionary):
   - `primitive.json`: raw values named by what they are (`color.primary.500`, `spacing.md`).
   - Semantic tokens named by use (`color.text.primary`, `button.danger.background`), always aliases to primitives.
   Components use semantic tokens only. Naming rules live in `packages/tokens/README.md`.
2. **Themes hold only what varies.** `src/themes/light.json` and `dark.json` contain semantic colors (and component colors like `button.*`). Spacing, radius and font size stay in the primitives, shared by both themes.
3. **One build per theme.** `build.js` builds primitives once, then each theme with the primitives as `include` and the theme as `source`, filtered with `token.isSource`.
   - Output: `tokens.css` (`:root`, primitives), `theme-light.css` (`:root`), `theme-dark.css` (`[data-theme="dark"]`).
   - Theme CSS uses `var()` references to the primitives, so `tokens.css` must load first.
   - Switching theme = setting `data-theme` on `<html>`.
4. **TypeScript output as a secondary channel.** `tokens.ts`, `tokens.light.ts`, `tokens.dark.ts` with resolved values, for JS that needs real colors (charts, native, tests). Components styled with CSS don't use them.
5. **Package `exports` are the public API.** Consumers import `@repo/tokens/tokens.css`, `theme-light.css`, `theme-dark.css`, `tokens`, `tokens.light`, `tokens.dark`; never `dist/...` paths.
6. **Unique token names in the TS build** via the `name/kebab` transform, which removed false collision warnings (e.g. five different `500`s).

## Consequences

- Retheming or adding a theme is a new JSON file plus one entry in `build.js`.
- Dark values were picked by hand and need design review.
- A token missing from `dark.json` silently falls back to the light value; there is no check yet that both files define the same tokens.
- `semantic.json` was removed once its contents moved into `light.json`.
- System-preference dark mode (`prefers-color-scheme`) is not implemented; only the manual `data-theme` toggle.
