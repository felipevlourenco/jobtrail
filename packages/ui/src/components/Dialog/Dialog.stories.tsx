import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';

const meta = { component: Dialog } satisfies Meta<typeof Dialog>;
export default meta;

export const Default: StoryObj<typeof meta> = {
    args: { children: null },
    render: () => (
        <Dialog>
            <Dialog.Trigger>Open dialog</Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Title</Dialog.Title>
                <p>Dialog content</p>
            </Dialog.Content>
        </Dialog>
    ),
};
