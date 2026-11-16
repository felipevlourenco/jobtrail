import type { Preview } from '@storybook/react-webpack5';

import '@repo/tokens/theme-dark.css';
import '@repo/tokens/theme-light.css';
import '@repo/tokens/tokens.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
