import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = { component: Card } satisfies Meta<typeof Card>;
export default meta;

export const Default: StoryObj<typeof meta> = {
    args: { id: 1, header: 'Acme', children: 'Frontend Engineer' },
};
