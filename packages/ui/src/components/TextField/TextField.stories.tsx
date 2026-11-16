import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = { component: TextField } satisfies Meta<typeof TextField>;
export default meta;

export const Default: StoryObj<typeof meta> = {
    args: { name: 'company', label: 'Company', placeholder: 'Company' },
};
