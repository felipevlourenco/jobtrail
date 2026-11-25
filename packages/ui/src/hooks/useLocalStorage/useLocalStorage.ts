import { useEffect } from 'react';

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): {
    getValue: () => T | null;
    setValue: (value: T) => void;
} {
    const getValue = () => {
        if (!window.localStorage) {
            return null;
        }

        try {
            const value = window.localStorage.getItem(key);

            if (value !== null) {
                const parsed = JSON.parse(value) as T;

                return parsed;
            }
        } catch (error) {
            console.error(`Error parsing localStorage[${key}]`, error);
        }

        return null;
    };

    const setValue = (value: T) => {
        if (!window.localStorage) {
            console.error(`Error: no localStorage in this env`);
        }

        const stringfied = JSON.stringify(value);
        window.localStorage.setItem(key, stringfied);
    };

    useEffect(() => {
        if (!window.localStorage) {
            return;
        }

        const hasValue = getValue();

        if (hasValue === null) {
            const stringfied = JSON.stringify(initialValue);
            window.localStorage.setItem(key, stringfied);
        }
    }, []);

    return {
        getValue,
        setValue,
    };
}
