import { useEffect, useLayoutEffect, useRef } from 'react';

export function useDebounce<T extends unknown[]>(
    callback: (...args: T) => void,
    delay = 300,
) {
    const callbackRef = useRef(callback);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return (...values: T) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callbackRef.current(...values);
        }, delay);
    };
}
