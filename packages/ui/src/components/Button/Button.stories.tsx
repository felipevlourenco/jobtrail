import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button';

const meta = { component: Button } satisfies Meta<typeof Button>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: { children: 'Save', variant: 'primary' },
};

export const CallsOnClick: StoryObj<typeof meta> = {
    args: { children: 'Save', onClick: fn() },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};

export const LoadingBlocksClick: StoryObj<typeof meta> = {
    args: { children: 'Save', loading: true, onClick: fn() },
    play: async ({ canvasElement, args }) => {
        const button = within(canvasElement).getByRole('button');
        await expect(button).toBeDisabled();
        await userEvent.click(button);
        await expect(args.onClick).not.toHaveBeenCalled();
    },
};

export const AsLink: StoryObj<typeof meta> = {
    args: { as: 'a', href: '/jobs', children: 'Jobs' },
    play: async ({ canvasElement }) => {
        await expect(
            within(canvasElement).getByRole('link', { name: 'Jobs' }),
        ).toHaveAttribute('href', '/jobs');
    },
};
