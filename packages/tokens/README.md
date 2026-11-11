# @repo/tokens

Design tokens in [DTCG](https://design-tokens.github.io/community-group/format/) JSON, built with Style Dictionary.

## Two layers

- `src/primitive.json` — raw values (`#3b82f6`, `16px`). Named by **what it is**, never where it's used.
- `src/semantic.json` — meaning (`text.primary`, `button.primary.background`). Named by **where/why it's used**, and always an alias to a primitive (`{color.neutral.900}`), never a raw value (exception: `surface.default` is pure white, which has no primitive).

Components consume **semantic** tokens only. Primitives are referenced only from `semantic.json`.

## Naming rules

Path segments go from general to specific: `category.group.variant.state`, lower camelCase, e.g. `color.border.focus`, `button.primary.backgroundHover`.

### Primitives

| Kind | Pattern | Example |
| --- | --- | --- |
| Color | `color.<hue>.<step>` | `color.primary.500` |
| Spacing / radius / fontSize / shadow | `<category>.<t-shirt size>` | `spacing.md` |

- Hues: `primary` (brand), `neutral` (grays), `success`, `warning`, `danger`.
- Steps run **50 → 900**: lower = lighter, higher = darker; `500` is the base shade. `primary` and `neutral` have the full scale (50, 100–900); status hues only have `50`, `500`, `700`, `900`.
- Sizes: `xs, sm, md, lg, xl` (`radius` adds `full`).

### Semantic

| Kind | Pattern | Example |
| --- | --- | --- |
| Global color | `color.<role>.<variant>` | `color.text.secondary` |
| Component | `<component>.<variant>.<property>[State]` | `button.danger.background` |

- Roles: `background`, `surface`, `border`, `text`, plus status roles `success`, `warning`, `danger` (each with `background`, `border`, `text`).
- Variants: `primary`, `secondary`, `inverse`, `brand`, `link`, `disabled`, `default`, `strong`, `raised`, `focus`.
- States are a camelCase suffix on the property: `backgroundHover`.
- `inverse` means "for use on the opposite theme surface" (e.g. `text.inverse` on `background.inverse`).

### Adding a token

1. Need a new raw value? Add it to `primitive.json` following the patterns above.
2. Need a new use of it? Add a semantic alias in `semantic.json`. Don't skip a layer.
3. Set `$type` on the group (not on each token) unless the token sits under a mixed group (see `button`).
