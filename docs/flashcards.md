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
