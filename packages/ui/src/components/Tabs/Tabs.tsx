import {
    createContext,
    useContext,
    useId,
    useState,
    type ComponentPropsWithoutRef,
    type KeyboardEvent,
} from 'react';
import './Tabs.css';

type TabsContextValue = {
    value: string;
    setValue: (value: string) => void;
    baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error('Tabs components must be used within <Tabs>');
    }

    return context;
}

type TabsProps = ComponentPropsWithoutRef<'div'> & {
    // `value` links a Tab to its Panel. It is used in ids, so no spaces.
    defaultValue: string;
};

function TabsRoot({ defaultValue, ...props }: TabsProps) {
    const [value, setValue] = useState(defaultValue);
    const baseId = useId();

    return (
        <TabsContext.Provider value={{ value, setValue, baseId }}>
            <div {...props} />
        </TabsContext.Provider>
    );
}

function TabsList({
    onKeyDown,
    className,
    ...props
}: ComponentPropsWithoutRef<'div'>) {
    // Arrows wrap around; Home/End jump. Focusing a tab also selects it.
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        const tabs = [
            ...event.currentTarget.querySelectorAll<HTMLButtonElement>(
                '[role="tab"]:not(:disabled)',
            ),
        ];
        const current = tabs.indexOf(event.target as HTMLButtonElement);
        const nextIndex: Record<string, number> = {
            ArrowRight: (current + 1) % tabs.length,
            ArrowLeft: (current - 1 + tabs.length) % tabs.length,
            Home: 0,
            End: tabs.length - 1,
        };
        const next = tabs[nextIndex[event.key]];

        if (event.defaultPrevented || current === -1 || !next) return;

        event.preventDefault(); // stop Home/End and arrows from scrolling
        next.focus();
        next.click();
    };

    return (
        <div
            {...props}
            role="tablist"
            className={`tabs--list ${className ?? ''}`}
            onKeyDown={handleKeyDown}
        />
    );
}

type TabProps = ComponentPropsWithoutRef<'button'> & { value: string };

function Tab({ value, onClick, className, ...props }: TabProps) {
    const tabs = useTabs();
    const selected = tabs.value === value;

    return (
        <button
            {...props}
            type="button"
            role="tab"
            id={`${tabs.baseId}-tab-${value}`}
            aria-controls={`${tabs.baseId}-panel-${value}`}
            aria-selected={selected}
            // Roving tabindex: the Tab key reaches only the selected tab.
            tabIndex={selected ? 0 : -1}
            className={`tabs--tab ${className ?? ''}`}
            onClick={(event) => {
                onClick?.(event);

                if (!event.defaultPrevented) {
                    tabs.setValue(value);
                }
            }}
        />
    );
}

type PanelProps = ComponentPropsWithoutRef<'div'> & { value: string };

function TabsPanel({ value, className, ...props }: PanelProps) {
    const tabs = useTabs();

    return (
        <div
            {...props}
            role="tabpanel"
            id={`${tabs.baseId}-panel-${value}`}
            aria-labelledby={`${tabs.baseId}-tab-${value}`}
            hidden={tabs.value !== value}
            tabIndex={0}
            className={`tabs--panel ${className ?? ''}`}
        />
    );
}

export const Tabs = Object.assign(TabsRoot, {
    List: TabsList,
    Tab,
    Panel: TabsPanel,
});
