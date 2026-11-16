import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = { component: Spinner } satisfies Meta<typeof Spinner>;
export default meta;

export const Medium: StoryObj<typeof meta> = {
    args: { size: 'md' },
};
