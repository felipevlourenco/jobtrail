## Day 7 — Tuesday, November 17

- Explain render, commit, reconciliation, and keys with examples.
    > Render: React calls your components to calculate what the UI should look like.
    > Reconciliation: React compares the new tree with the previous one to determine what changed.
    > Commit: React applies the necessary changes to the DOM and runs relevant effects.
    > Keys: Help React identify elements between renders, especially in lists, so it can preserve the correct component state.
- Explain primitive, semantic, and component tokens, and why the semantic layer matters.
    > Primitive tokens: Raw values, such as blue-500, spacing-4, or gray-900.
    > Semantic tokens: Describe the purpose of a value, such as color-text-primary or color-background.
    > Component tokens: Specific to a component, such as button-primary-background.
- Design theming without duplicating component code.

    > Use CSS variables and semantic tokens.

    ```
        :root {
            --color-background: white;
            --color-text: #222;
        }

        [data-theme="dark"] {
            --color-background: #222;
            --color-text: white;
        }

        .card {
            background: var(--color-background);
            color: var(--color-text);
        }
    ```

- Defend my component APIs and my styling approach, including their downsides.
    > Component APIs: Prefer composable, predictable APIs with sensible defaults. For example, a Dialog with open, onOpenChange, Trigger, and Content.
           Trade-off: More flexible APIs can become harder to understand and maintain.
    > Styling: CSS Modules or CSS variables provide scoped styles and predictable theming.
           Trade-off: CSS Modules can make global design changes harder, while CSS-in-JS can add runtime or tooling complexity.
    The goal is consistency, maintainability, and ease of use—not maximum flexibility.
- Describe the keyboard and focus behaviour of a dialog and a form field.
    > Dialog:
          - Opens with focus moved inside.
          - Tab and Shift + Tab keep focus inside the dialog.
          - Escape closes it, when dismissal is allowed.
          - Closing returns focus to the element that opened it.
          - Has an accessible name, usually through aria-labelledby.
    > Form field:
          - Must be reachable and usable with the keyboard.
          - Has a properly associated <label>.
          - Tab moves between fields; Space or Enter activates relevant controls.
          - Validation errors should be clearly communicated, ideally using aria-describedby and aria-invalid.
          - Focus should not be lost when displaying validation feedback.
