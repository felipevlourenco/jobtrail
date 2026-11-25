// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Tabs } from './Tabs';

it('moves focus and selection with the keyboard', () => {
    const { getByRole } = render(
        <Tabs defaultValue="a">
            <Tabs.List>
                <Tabs.Tab value="a">A</Tabs.Tab>
                <Tabs.Tab value="b" disabled>
                    B
                </Tabs.Tab>
                <Tabs.Tab value="c">C</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="a">Panel A</Tabs.Panel>
            <Tabs.Panel value="c">Panel C</Tabs.Panel>
        </Tabs>,
    );
    const press = (key: string) => {
        fireEvent.keyDown(document.activeElement!, { key });
    };
    const expectSelected = (name: string) => {
        const tab = getByRole('tab', { name });

        expect(document.activeElement).toBe(tab);
        expect(tab.getAttribute('aria-selected')).toBe('true');
        expect(getByRole('tabpanel').textContent).toBe(`Panel ${name}`);
    };

    getByRole('tab', { name: 'A' }).focus();

    press('ArrowRight'); // skips the disabled tab
    expectSelected('C');
    press('ArrowRight'); // wraps
    expectSelected('A');
    press('ArrowLeft');
    expectSelected('C');
    press('Home');
    expectSelected('A');
    press('End');
    expectSelected('C');
});
