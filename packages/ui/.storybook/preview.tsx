import type { Preview } from '@storybook/react-vite';

import '@jobtrail/tokens/theme-dark.css';
import '@jobtrail/tokens/theme-light.css';
import '@jobtrail/tokens/tokens.css';

const preview: Preview = {
    initialGlobals: { theme: 'light' },
    globalTypes: {
        theme: {
            description: 'Theme',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: ['light', 'dark'],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, context) => {
            document.documentElement.dataset.theme = context.globals.theme;
            document.body.style.background = 'var(--color-background-primary)';
            document.body.style.color = 'var(--color-text-primary)';
            return <Story />;
        },
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'error',
        },
    },
};

export default preview;
