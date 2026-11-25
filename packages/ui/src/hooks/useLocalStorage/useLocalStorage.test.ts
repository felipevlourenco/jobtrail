// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { beforeEach, expect, it } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

beforeEach(() => {
    window.localStorage.clear();
});

it('stores the initial value when the key is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current.getValue()).toBe('initial');
});

it('keeps an existing value instead of the initial one', () => {
    window.localStorage.setItem('key', JSON.stringify('saved'));

    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current.getValue()).toBe('saved');
});

it('writes and reads a value', () => {
    const { result } = renderHook(() => useLocalStorage('key', { count: 0 }));

    result.current.setValue({ count: 1 });

    expect(result.current.getValue()).toEqual({ count: 1 });
});

it.each([0, false, ''])('keeps a saved falsy value: %j', (saved) => {
    window.localStorage.setItem('key', JSON.stringify(saved));

    const { result } = renderHook(() =>
        useLocalStorage<unknown>('key', 'initial'),
    );

    expect(result.current.getValue()).toBe(saved);
});
