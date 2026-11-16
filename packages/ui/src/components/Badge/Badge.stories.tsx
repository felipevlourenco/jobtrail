import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = { component: Badge } satisfies Meta<typeof Badge>;
export default meta;

export const Neutral: StoryObj<typeof meta> = {
    args: { children: 'Applied', variant: 'neutral' },
};
