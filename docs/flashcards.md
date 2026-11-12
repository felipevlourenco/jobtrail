## Day 1 — Nov 11

<details>
    <summary>What's the difference between render and commit?</summary>

    Render: React calls my components and works out what changed. Commit: it applies those changes to the DOM, then effects run.
    **Where:** packages/ui/src/Card.tsx (the index-key bug)

</details>
<details>
    <summary>What causes a React component to re-render? What role do keys play?</summary>

    Re-renders causes: State changes, Parent re-renders, props changes, consumed context changes.
    Keys must be stable between renders, so react knows where each sibiling is placed and apply the changes only in the correct sibling.
    **Where:** apps/lab/src/playground/CardList.tsx (the index-key bug)

</details>

## Day 2 — Nov 11

<details>
    <summary>Why not use raw hex values or a Tailwind palette directly in components? What does the semantic layer buy you?</summary>

    Semantic tokens separate design intent from implementation, enabling consistent styling, easy theming, centralized updates, and better maintainability without changing individual components.
    **Where:** packages/tokens/src/semantic.json

</details>

## Day 3 — Nov 12

<details>
    <summary>What should a theme file (light.json / dark.json) contain, and what should it leave out?</summary>

    Only the semantic tokens whose value changes between themes (colors, maybe shadows), as aliases to primitives. Spacing, radius and font size stay in primitive.json, so they aren't duplicated and can't drift apart.
    **Where:** packages/tokens/src/themes/dark.json

</details>
<details>
    <summary>How does one token set become light and dark CSS, and how does the app switch between them?</summary>

    build.js runs Style Dictionary once for the primitives and once per theme (primitives as `include`, the theme as `source`, filter `token.isSource` so only theme tokens are emitted). Light is `:root`, dark is `[data-theme="dark"]`. Same variable names in both; set `data-theme` on `<html>` to switch. Package `exports` decides which paths can be imported.
    **Where:** packages/tokens/build.js

</details>

## Day 4 — Nov 12

<details>
    <summary>How do you design a component API that's flexible but still keeps the UI consistent?</summary>

    Prefer small set of meaninful props over many style props. Style props can break consistence.
    Use the same names for similart ideas across the components (size = 'md').
    Extend the native elements, like Button should extend button props.
    **Where:** packages/ui/src/components/Button/Button.tsx

</details>
